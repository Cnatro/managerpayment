import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../../entities/categories.entity';
import type { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class CategoryCommandService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepo: CategoryRepository,
  ) {}

  create(dto: Category) {
    return this.categoryRepo.create(dto);
  }

  update(dto: Category) {
    return this.categoryRepo.update(dto);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}
