/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseRepository } from '../../core/repositories/expenses.repository';
import { ExpenseModel } from '../models/expense.model';
import { Expense } from '../../core/entities/expenses.entity';
import { ExpenseMapper } from '../../interfaces/mappers/expenses.mapper';

@Injectable()
export class ExpensesRepositoryImpl implements ExpenseRepository {
  constructor(
    @InjectRepository(ExpenseModel)
    private readonly repo: Repository<ExpenseModel>,
  ) {}

  async create(data: Expense): Promise<Expense> {
    const saved = await this.repo.save(ExpenseMapper.toModel(data));
    return ExpenseMapper.toEntity(saved);
  }

  async update(data: Expense): Promise<Expense> {
    const existing = await this.repo.findOneBy({ id: data.id });

    if (!existing) throw new Error('Expenses not found');

    const merged = this.repo.merge(existing, ExpenseMapper.toModel(data));
    const saved = await this.repo.save(merged);

    return ExpenseMapper.toEntity(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(): Promise<Expense[]> {
    const data = await this.repo.find();
    return data.map(ExpenseMapper.toEntity);
  }

  async findById(id: number): Promise<Expense | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? ExpenseMapper.toEntity(data) : null;
  }

  async sumAmountByUser(userId: number): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.user_id = :userId', {
        userId,
      })
      .getRawOne();

    return Number(result.total || 0);
  }
}
