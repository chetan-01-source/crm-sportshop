import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform input objects to match DTO classes
      whitelist: true, // Remove extra properties not defined in DTOs
      forbidNonWhitelisted: true, // Throw an error for properties not allowed in DTOs
    }),
  );

  // Enable CORS for the application (optional)
  app.enableCors({
    origin: true, // Replace with your frontend domain
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow cookies and credentials
  });

  // Log the MongoDB connection URI (useful for debugging)
  console.log('MongoDB URI:', process.env.MONGO_URI);

  // Start the application and listen on the specified port or default to 3000
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on port ${process.env.PORT || 3000}`);
}

// Bootstrap the application
bootstrap();
