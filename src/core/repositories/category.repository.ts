import { Category } from '../entities/categories.entity';

export interface CategoryRepository {
  create(data: Category): Promise<Category>;
  update(data: Category): Promise<Category>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
}
