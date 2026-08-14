import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrors } from './common/filters/custom-error';
import { Logger, VersioningType } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);

  app.useGlobalFilters(new CustomErrors());

  // https://mi-url.com.ar/api/
  app.setGlobalPrefix('api');
  // https://mi-url.com.ar/api/v{n}/{endpoint}
  app.enableVersioning({ type: VersioningType.URI });

  logger.log(`Server running on port: ${envs.PORT}`);
}
bootstrap();
