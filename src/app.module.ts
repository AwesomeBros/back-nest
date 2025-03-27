import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { RequestMiddleware } from './common/utils/logger.middleware';

@Module({
  imports: [CommonModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
