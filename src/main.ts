import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.enableCors({
      origin: true,
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
    });

    console.log('MongoDB URI:', process.env.MONGO_URI);
    await app.listen(process.env.PORT || 8080, '0.0.0.0');
    console.log(`Application is running on port ${process.env.PORT || 3000}`);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();