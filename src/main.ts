import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { winstonLogger } from './common/utils/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = winstonLogger;
  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성을 요청에서 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 포함된 경우, 요청을 거부
      transformOptions: {
        enableImplicitConversion: true, // 타입 변환을 자동으로 수행
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(logger)); // 전역 예외처리
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
