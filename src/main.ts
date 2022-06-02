import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swager';
import { PORT } from './config/constants';
import { setDefaultUser } from './scripts/default.user';
import generateTypeormConfigFile from './scripts/generate-typeorm-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port =  parseInt(config.get<string>(PORT), 10) || 3000;

  initSwagger(app);
  setDefaultUser(config), //aqui importamos el usuario creado por defecto a la BD
  generateTypeormConfigFile(config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()} `)
}
bootstrap();

