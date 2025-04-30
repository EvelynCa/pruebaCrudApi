import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // O especifica el puerto del frontend si es más seguro
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
