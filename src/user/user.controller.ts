import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources, AppRoles } from 'src/app.roles';
import { User } from 'src/commons/decorators';
import { Auth } from 'src/commons/decorators/auth.decorators';
import { CreateUserDto, EditeUserDto } from './dtos';
import { UserRegistrationDto } from './dtos/user.registration.dto';
import { User as UserEntity } from './entities';
import { UserService } from './user.service';

@ApiTags('User Routes')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder //esto ayuda a crear la logica de permisos de usuario para cada ruta
    ) {}

    @Get()
   async getMany() {
       const data = await this.userService.getMany();
       return {data}
   }

   @Post('register') //ruta pública de registro
   async publicRegistration(
       @Body() dto: UserRegistrationDto){
           const data = await this.userService.createOne({
               ...dto, roles: [AppRoles.AUTHOR]
           });
           return {
               message: 'Successfull registration', data
           }
       }

    @Get(':id')
   async getOne(
        @Param('id') id: number,
    ) {
        const data = await this.userService.getOne(id); 
        return {data}
    }
     
    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResources.USER
    })
    @Post()
   async createOne(
        @Body() dto: CreateUserDto
    ) {
        const data = await this.userService.createOne(dto)
        return {message: 'User created', data}
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResources.USER
    })
    @Put(':id')
   async editOne(
        @Param('id') id: number,
        @Body() dto: EditeUserDto,
        @User() user: UserEntity
    ) {
        let data
        if(this.rolesBuilder.can(user.roles)
               .updateAny(AppResources.USER)
               .granted)
        {
            //is ADMIN
          data = await this.userService.editOne(id, dto)
          console.log('este es un admin')
        }else{
            //is AUTHOR
          const {roles, ...rest} = dto;  
          data = await this.userService.editOne(id, rest, user) //pasando el rest aqui evito que un usuario author se pueda cambiar el mismo a Admin
          console.log('este es un autor')
        }
        return {message: 'User edited', data}
    }

    @Auth({
        action: 'delete',
        possession: 'own',
        resource: AppResources.USER,
      })
      @Delete(':id')
      async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
        
        let data;
    
        if (this.rolesBuilder.can(user.roles).updateAny(AppResources.USER).granted) {
          // is Admin
          data = await this.userService.deleteOne(id);
        } else {
          // is Author
          data = await this.userService.deleteOne(id, user);
        }
        return { message: 'User deleted', data };
      }
}
