import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrors } from './common/filters/custom-error';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalFilters(new CustomErrors());

  // https://mi-url.com.ar/api/
  app.setGlobalPrefix('api');
  // https://mi-url.com.ar/api/v{n}/{endpoint}
  app.enableVersioning({ type: VersioningType.URI });
}
bootstrap();
