import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/models/init/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MODELS } from './infrastructure/models/init';
import { MODULES } from './interfaces/modules/init/index.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature(MODELS), ...MODULES],
})
export class AppModule {}
