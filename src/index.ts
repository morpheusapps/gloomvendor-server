import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './ApplicationModule';

const port = process.env.PORT || 8307;

const runServer = async (port: string | number): Promise<void> => {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('gloomvendor-server')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  return app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log('gloomvendor-server service running on ' + port)
  );
};

runServer(port);
