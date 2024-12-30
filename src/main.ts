import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transforms payload into DTO types
    whitelist: true, // Strips properties that are not part of the DTO
    forbidNonWhitelisted: true, // Throws an error if there are non-whitelisted properties
  }));

  console.log('MongoDB URI:', process.env.MONGO_URI);
  await app.listen(process.env.PORT || 3000); // Default to port 3000 if not defined in env
}

bootstrap();
