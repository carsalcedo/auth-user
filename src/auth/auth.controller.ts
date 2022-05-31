import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators';
import { Auth } from 'src/commons/decorators/auth.decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    //con esto nos autenticamos
    @UseGuards(localAuthGuard)
    @Post('login')
    login(
      @User() user: UserEntity
    ) {
      const data = this.authService.login(user)
      return{
        message: 'Login exitoso',
        data
      }
    }

    @Auth()
    @Get('profile')
    profile(@User() user: UserEntity) {
        return {
          message: 'Successfull request',
          user
        };
    }

    @Auth()
    @Get('refresh')
    refreshToken(@User() user: UserEntity){
      const data = this.authService.login(user);
      return {
        message: 'Refresh exitoso',
        data,
      };
    }
}


