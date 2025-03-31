import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AdminAppModule } from './presenters/rest/admin/app.module';

async function bootstrap() {
  const adminApp = await NestFactory.create(AdminAppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(adminApp, swaggerConfig);
  SwaggerModule.setup('swagger', adminApp, documentFactory);

  adminApp.use(cookieParser());

  await adminApp.listen(process.env.PORT ?? 3000);
}

bootstrap();
