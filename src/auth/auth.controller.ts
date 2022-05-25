import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/commons/decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard, localAuthGuard } from './guards';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    //con esto nos autenticamos
    @UseGuards(localAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
      const data = await this.authService.login(user);
      return {
        message: 'Login exitoso',
        data,
      };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile() {
        return 'AQUI ESTAN TUS DATOS';
    }
}


