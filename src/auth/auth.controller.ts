import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: any) {
        return req.user;
    }

    @Get('profile')
    profile() {
        return 'AQUI ESTAN TUS DATOS';
    }
}
