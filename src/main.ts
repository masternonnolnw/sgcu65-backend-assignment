import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyBXFAESWAech5bIG59xjwLsSIZRXnoWahE',
  authDomain: 'sgcu-isd.firebaseapp.com',
  projectId: 'sgcu-isd',
  storageBucket: 'sgcu-isd.appspot.com',
  messagingSenderId: '663186769431',
  appId: '1:663186769431:web:f0d0cc83104e8b4c31fe52',
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
