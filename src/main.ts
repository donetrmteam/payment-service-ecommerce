import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { retry } from 'rxjs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST || 'localhost',
      port: parseInt(process.env.TCP_PORT || '8080'),
      retryAttempts: 5,
      retryDelay: 3000,
      },
      logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen();
  console.log(`Microservicio de pagos iniciado en  ${process.env.TCP_HOST || 'localhost'}:${process.env.TCP_PORT || '8080'}`);
}
bootstrap();
