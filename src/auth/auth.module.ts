import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { localStrategy } from './strategies';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, localStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
