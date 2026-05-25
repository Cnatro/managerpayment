/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CategoryModel } from '../models/category.model';
import { Category } from '../../core/entities/categories.entity';
import { CategoryRepository } from '../../core/repositories/category.repository';
import { CategoryMapper } from '../../interfaces/mappers/category.mapper';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly repo: Repository<CategoryModel>,
  ) {}

  async create(data: Category): Promise<Category> {
    const model = CategoryMapper.toModel(data);
    const saved = await this.repo.save(model);

    return CategoryMapper.toEntity(saved);
  }

  async update(data: Category): Promise<Category> {
    const existing = await this.repo.findOne({
      where: { id: data.id },
    });

    if (!existing) {
      throw new Error(`Category not found with id ${data.id}`);
    }

    const updatedModel = this.repo.merge(
      existing,
      CategoryMapper.toModel(data),
    );

    const saved = await this.repo.save(updatedModel);

    return CategoryMapper.toEntity(saved);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.repo.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Category not found');
    }

    entity.is_deleted = true;
    await this.repo.save(entity);
  }

  async findAll(): Promise<Category[]> {
    const data = await this.repo.find({
      order: { id: 'DESC' },
    });

    return data.map(CategoryMapper.toEntity);
  }

  async findById(id: number): Promise<Category | null> {
    const data = await this.repo.findOne({
      where: { id },
    });

    if (!data) return null;

    return CategoryMapper.toEntity(data);
  }

  async findAllInIds(ids: number[]): Promise<Category[]> {
    const data = await this.repo.find({
      where: {
        id: In(ids),
      },
    });

    return data.map(CategoryMapper.toEntity);
  }
}
