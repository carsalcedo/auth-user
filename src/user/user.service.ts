import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditeUserDto } from './dtos';
import { User } from './entities';

export interface UserFindOne{
    id?: number;
    email?: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

   async getMany() {
        return await this.userRepository.find()
    }

   async getOne(id: number, userEntity?: User) {
     const user = await this.userRepository.findOne(id)
                    .then(u => !userEntity 
                        ? u 
                        : !!u && userEntity.id === u.id ? u : null);
     if(!user) throw new NotFoundException('user does not exists or unauthorized')
     
     return user;
   }

   async createOne(dto: CreateUserDto) {
       const userExist = await this.userRepository.findOne({email: dto.email}); //valida que nos e repita el mismo correo
       if (userExist) throw new BadRequestException('user already registered with email');

       const newUser = this.userRepository.create(dto)
       const user = await this.userRepository.save(newUser);

       delete user.password; //hace que no se muestre el password en la consulta
       return user;
   }

   async editOne(id: number, dto: EditeUserDto, userEntity?: User) {
       const user = await this.getOne(id, userEntity)
       const editedUser = Object.assign(user, dto);
       return await this.userRepository.save(editedUser)
   }

   async deleteOne(id: number, userEntity?: User) {
       const user = await this.getOne(id);
       return await this.userRepository.remove(user);

   }

   async findOne(data: UserFindOne) {
       return await this.userRepository
            .createQueryBuilder('user')
            .where(data)
            .addSelect('user.password')
            .getOne()
   }
}
