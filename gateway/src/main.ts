import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrors } from './common/filters/custom-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalFilters(new CustomErrors());
}
bootstrap();
