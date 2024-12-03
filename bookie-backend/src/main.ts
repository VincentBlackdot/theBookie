import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Change this to the frontend URL
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to match DTO types
      whitelist: true, // Remove fields not in the DTO
      forbidNonWhitelisted: true, // Throw error for unknown fields
    }),
  );

   const config = new DocumentBuilder()
    .setTitle('Library API') // API title
    .setDescription('API for managing books in a library') // API description
    .setVersion('1.0') // API version
    .addBearerAuth() // Enable bearer authentication (JWT)
    .build();
  
  const document = SwaggerModule.createDocument(app, config); // Create Swagger document
  SwaggerModule.setup('api', app, document); // Expose the Swagger UI at /api

  await app.listen(3000);
}
bootstrap();
