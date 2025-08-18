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
const { AppModule } = require('./dist/app.module');

let cachedServer;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enable CORS if needed (recommended for APIs)
    app.enableCors();
    
    // Initialize the application (but don't call listen())
    await app.init();
    
    return serverless(app.getHttpAdapter().getInstance());
  } catch (error) {
    console.error('NestJS initialization failed:', error);
    throw error;
  }
}

module.exports.handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context);
};