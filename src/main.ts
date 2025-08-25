import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for Vercel
  app.enableCors();
  
  // For serverless environment, don't use app.listen()
  // Instead, export the Express instance
  const expressApp = app.getHttpAdapter().getInstance();
  
  // Export for Vercel
  module.exports = expressApp;
}

// Only call bootstrap() if not in serverless environment
if (process.env.VERCEL !== '1') {
  bootstrap().then(() => {
    console.log('Server started on port 3000');
  });
}