import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // <--- THIS LINE IS CRITICAL
  console.log('✅ App is listening on http://localhost:3000');
}
bootstrap();