import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/config/constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { localStrategy} from './strategies';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [PassportModule,
            JwtModule.registerAsync({
              inject: [ConfigService],
              useFactory: (config: ConfigService) =>({
                secret: config.get<string>(JWT_SECRET),
                signOptions: {expiresIn: '60s'}
              })
            }),
            UserModule
           ],
  providers: [AuthService, localStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
