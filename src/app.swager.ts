import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('User CRUD')
      .addBearerAuth() //aqui inyectamos el JWT
      .setDescription(
        'Esta es una API Creada con NestJS con un CRUD para registro de usuarios',
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);};