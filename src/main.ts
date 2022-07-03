import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CONFIG_STRORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CONFIG_APP_ID,
};
initializeApp(firebaseConfig);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ISD API')
    .setDescription(
      'The api for ISD_SGCU Backend "to access admin route please login at auth/login first"',
    )
    .setVersion('1.0')
    .addTag('ISD_SGCU')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
