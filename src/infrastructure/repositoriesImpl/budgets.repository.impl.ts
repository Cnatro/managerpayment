/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetRepository } from '../../core/repositories/budgets.repository';
import { BudgetModel } from '../models/budget.model';
import { Budget } from '../../core/entities/budgets.entity';
import { BudgetMapper } from '../../interfaces/mappers/budget.mapper';
import { BudgetFilter } from '../../core/services/dto/filters/budgetFilter';

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
    const entity = await this.repo.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Category not found');
    }

    entity.is_deleted = true;
    await this.repo.save(entity);
  }

  async findAll(): Promise<Budget[]> {
    const data = await this.repo.find({
      order: { id: 'DESC' },
    });

    return data.map(BudgetMapper.toEntity);
  }

  async findAllWithFilter(
    query: BudgetFilter,
    userId: number,
  ): Promise<Budget[]> {
    const month = query.month ?? new Date().getMonth() + 1;
    const data = await this.repo
      .createQueryBuilder('budget')

      .leftJoin(
        'expenses',
        'expense',
        `
        expense.user_id = budget.user_id
        AND expense.is_deleted = false
        AND expense.date::date >= budget.start_date::date
        AND expense.date::date <= budget.end_date::date
      `,
      )

      .select([
        'budget.id AS id',
        'budget.limit_amount AS "limitAmount"',
        'budget.start_date AS "startDate"',
        'budget.end_date AS "endDate"',
        'budget.name AS "name"',
      ])

      .addSelect('COALESCE(SUM(expense.amount), 0)', 'used')

      .where('EXTRACT(MONTH FROM budget.start_date::date) = :month', { month })

      .andWhere('budget.is_deleted = false')

      .andWhere('budget.user_id = :userId', {
        userId,
      })

      .groupBy('budget.id')

      .addGroupBy('budget.limit_amount')
      .addGroupBy('budget.start_date')
      .addGroupBy('budget.end_date')

      .getRawMany();

    return data;
  }

  async findById(id: number, userId: number): Promise<any | null> {
    const data = await this.repo
      .createQueryBuilder('budget')

      .leftJoin(
        'expenses',
        'expense',
        `
        expense.user_id = budget.user_id
        AND expense.is_deleted = false
        AND expense.date::date >= budget.start_date::date
        AND expense.date::date <= budget.end_date::date
      `,
      )

      .leftJoin('categories', 'category', 'category.id = expense.category_id')

      .select([
        'budget.id AS id',
        'budget.limit_amount AS "limitAmount"',
        'budget.start_date AS "startDate"',
        'budget.end_date AS "endDate"',

        'expense.id AS "expenseId"',
        'expense.amount AS amount',
        'expense.week AS week',
        'expense.month AS month',
        'expense.note AS note',
        'expense.date AS date',

        'category.name AS "categoryName"',
      ])

      .where('budget.id = :id', { id })

      .andWhere('budget.user_id = :userId', {
        userId,
      })

      .andWhere('budget.is_deleted = false')

      .getRawMany();

    if (!data.length) return null;

    return data;
  }
}
