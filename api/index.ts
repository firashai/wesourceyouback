import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function createApp() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );
  
  app.enableCors();
  await app.init();
  
  return server;
}

// Create and export the app
const appPromise = createApp();

export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};