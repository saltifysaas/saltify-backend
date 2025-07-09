import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load correct .env file based on NODE_ENV (default: development)
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: join(__dirname, '..', envFile) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`✅ App is listening on http://localhost:3000 with ${process.env.NODE_ENV} config`);
}
bootstrap();