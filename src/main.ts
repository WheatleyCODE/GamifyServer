import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function start() {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({ credentials: true, origin: process.env.URL_CLIENT });
    await app.listen(PORT, () => console.log('Server started on PORT:', PORT));
  } catch (e) {
    console.log(e);
  }
}

start();
