import 'reflect-metadata'; // ✅ Required for decorators & TypeORM
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';

// ✅ Load correct .env file based on NODE_ENV (default: staging)
const envFile = `.env.${process.env.NODE_ENV || 'staging'}`;
dotenv.config({ path: join(__dirname, '..', envFile) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation for DTOs & decorators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Enable CORS for your frontend (production + staging + local)
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://saltify-frontend.vercel.app',
        'https://saltify-frontend-git-main-yuvraj-chaubeys-projects.vercel.app',
        'https://saltify-frontend-git-staging-yuvraj-chaubeys-projects.vercel.app',
        'https://prod.saltifysaas.com',
        'https://app.saltifysaas.com',
      ];

      const allowedPatterns = [
        /\.localhost:3000$/, // ✅ Allow *.localhost:3000 subdomains
      ];

      if (!origin) {
        callback(null, true);
        return;
      }

      if (
        allowedOrigins.includes(origin) ||
        allowedPatterns.some((pattern) => pattern.test(origin))
      ) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(
    `✅ App is listening on http://localhost:${port} using ${envFile}`,
  );
}

bootstrap();
