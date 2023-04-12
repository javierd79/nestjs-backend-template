import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';
import { WsAdapter } from '@nestjs/platform-ws';
import 'src/common/proto/date';
import 'src/common/proto/array';
import 'src/common/proto/json';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = process.env.PORT || 4000;

  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(PORT);

  Logger.log(`\n\n\n\nBACKEND RUNNING ON: http://localhost:${PORT}/\n\n\n`);
}

void bootstrap();
