/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetRepository } from '../../core/repositories/budgets.repository';
import { BudgetModel } from '../models/budget.model';
import { Budget } from '../../core/entities/budgets.entity';
import { BudgetMapper } from '../../interfaces/mappers/budget.mapper';

@Injectable()
export class BudgetRepositoryImpl implements BudgetRepository {
  constructor(
    @InjectRepository(BudgetModel)
    private readonly repo: Repository<BudgetModel>,
  ) {}

  async create(data: Budget): Promise<Budget> {
    const saved = await this.repo.save(BudgetMapper.toModel(data));
    return BudgetMapper.toEntity(saved);
  }

  async update(data: Budget): Promise<Budget> {
    const existing = await this.repo.findOneBy({ id: data.id });

    if (!existing) throw new Error('Budget not found');

    const merged = this.repo.merge(existing, BudgetMapper.toModel(data));
    const saved = await this.repo.save(merged);

    return BudgetMapper.toEntity(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(): Promise<Budget[]> {
    const data = await this.repo.find();
    return data.map(BudgetMapper.toEntity);
  }

  async findById(id: number): Promise<Budget | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? BudgetMapper.toEntity(data) : null;
  }
}
