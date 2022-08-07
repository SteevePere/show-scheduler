/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  const config = new DocumentBuilder()
    .setTitle('KOJI scheduler')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);

  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));

  app.use(cookieParser());
  app.use(helmet());

  if (configService.get('security.cors')) {
    app.enableCors({
      origin: configService.get('security.cors'),
      credentials: true,
    });
  } else {
    app.enableCors();
  }

  const rateLimitValue = configService.get('security.rateLimit');
  if (rateLimitValue && rateLimitValue != '-1') {
    app.use(
      rateLimit({
        windowMs: 1 * 60 * 1000,
        max: parseInt(rateLimitValue, 10),
      }),
    );
  }

  const useProxy = (configService.get('security.proxy') || '').toLowerCase();
  if (useProxy === 'true' || useProxy === '1') {
    app.set('trust proxy', 1);
  }

  const { host, port } = configService.get('server');

  app.setGlobalPrefix('/api');

  await app.listen(port, host);
}

bootstrap();
