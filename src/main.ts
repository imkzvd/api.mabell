import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminAppModule } from './presenters/rest/admin/app.module';
import { ClientAppModule } from './presenters/rest/client/app.module';
import { HttpExceptionFilter } from './presenters/rest/common/filters/http-exception.filter';

async function runAdminApp() {
  const app = await NestFactory.create(AdminAppModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.enableCors({
    origin: configService.get<string[]>('cors.origin'),
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipNullProperties: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get<number>('app.port');

  await app.listen(port ?? 3000);
}

async function runClientApp() {
  const app = await NestFactory.create(ClientAppModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipNullProperties: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get<number>('app.port') ?? 4000);
}

void runAdminApp().then(() => {
  console.log('Admin API Server started');
});

void runClientApp().then(() => {
  console.log('Client API Server started');
});
