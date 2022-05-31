import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DATABASE_HOST, DBNAME, PASSWORD, PUERTO, USERNAME } from './config/constants';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(PUERTO), 10),
        username: 'developer',
        password: config.get<string>(PASSWORD),
        database: config.get<string>(DBNAME),
        entities: [__dirname + './**/**/*entities{.ts,.js}'],
        autoLoadEntities:true,
        synchronize: true,
        logging: true,
        logger: 'file',
        retryDelay: 3000
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AccessControlModule.forRoles(roles),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
