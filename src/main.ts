import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(parseInt('3030', 10), () =>
    console.info(`Server is running on port 3030`),
  );
}
bootstrap();
