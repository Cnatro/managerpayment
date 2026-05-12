import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModel } from '../../infrastructure/models/category.model';
import { CategoryController } from '../../interfaces/controllers/category.controller';
import { CategoryCommandService } from '../../core/services/command/category.command.service';
import { CategoryQueryService } from '../../core/services/query/category.query.service';
import { CategoryRepositoryImpl } from '../../infrastructure/repositoriesImpl/category.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel])],
  controllers: [CategoryController],
  providers: [
    CategoryCommandService,
    CategoryQueryService,

    {
      provide: 'CategoryRepository',
      useClass: CategoryRepositoryImpl,
    },
  ],
  exports: ['CategoryRepository'],
})
export class CategoryModule {}
