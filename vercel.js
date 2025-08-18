const { createServer } = require('http');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const serverless = require('serverless-http');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return serverless(app.getHttpAdapter().getInstance());
}

let server;
module.exports = async (req, res) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
};