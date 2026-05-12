import { Inject, Injectable } from '@nestjs/common';
import type { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class CategoryQueryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepo: CategoryRepository,
  ) {}

  findAll() {
    return this.categoryRepo.findAll();
  }

  findById(id: number) {
    return this.categoryRepo.findById(id);
  }
}
