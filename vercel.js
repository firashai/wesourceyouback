// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { TransformInterceptor } from './common/interceptors/transform.interceptor';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// const { createServer } = require('http');
// const serverless = require('serverless-http');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Global pipes
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   // Global filters
//   app.useGlobalFilters(new HttpExceptionFilter());

//   // Global interceptors
//   app.useGlobalInterceptors(new TransformInterceptor());

//   // Swagger setup
//   const config = new DocumentBuilder()
//     .setTitle('Media Brokerage API')
//     .setDescription('API for media professionals and companies')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
//   return serverless(app.getHttpAdapter().getInstance());

// //   await app.listen(process.env.PORT || 3000);
// }
// // bootstrap();
// let server;
// module.exports = async (req, res) => {
//   if (!server) {
//     server = await bootstrap();
//   }
//   return server(req, res);
// };

const { NestFactory } = require('@nestjs/core');
const serverless = require('serverless-http');
const { AppModule } = require('./dist/app.module'); // Make sure this path matches your build output

let cachedServer;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return serverless(app.getHttpAdapter().getInstance());
}

module.exports.handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context);
};