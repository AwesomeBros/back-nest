import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule {}
