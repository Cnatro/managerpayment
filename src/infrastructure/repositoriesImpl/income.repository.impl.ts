/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeRepository } from '../../core/repositories/income.repository';
import { IncomeModel } from '../models/income.model';
import { Income } from '../../core/entities/income.entity';
import { IncomeMapper } from '../../interfaces/mappers/income.mapper';

@Injectable()
export class IncomeRepositoryImpl implements IncomeRepository {
  constructor(
    @InjectRepository(IncomeModel)
    private readonly repo: Repository<IncomeModel>,
  ) {}

  async create(data: Income): Promise<Income> {
    const saved = await this.repo.save(IncomeMapper.toModel(data));
    return IncomeMapper.toEntity(saved);
  }

  async update(data: Income): Promise<Income> {
    const existing = await this.repo.findOneBy({ id: data.id });

    if (!existing) throw new Error('Income not found');

    const merged = this.repo.merge(existing, IncomeMapper.toModel(data));
    const saved = await this.repo.save(merged);

    return IncomeMapper.toEntity(saved);
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

  async findAll(userId: number): Promise<Income[]> {
    const data = await this.repo.find({ where: { user_id: userId } });
    return data.map(IncomeMapper.toEntity);
  }

  async findById(id: number): Promise<Income | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? IncomeMapper.toEntity(data) : null;
  }

  async sumAmountByUser(userId: number): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'total')
      .where('income.user_id = :userId', {
        userId,
      })
      .getRawOne();

    return Number(result.total || 0);
  }

  async findTotalAmountInMonthByUser(userId: number): Promise<any> {
    const result = await this.repo
      .createQueryBuilder('income')
      .select(`TO_CHAR(income.date, 'MM/YYYY')`, 'month')
      .addSelect('SUM(income.amount)', 'value')
      .where('income.user_id = :userId', { userId })
      .groupBy(`TO_CHAR(income.date, 'MM/YYYY')`)
      .orderBy(`MIN(income.date)`, 'ASC')
      .getRawMany();

    return result;
  }

  async findTotalAmountInWeekByUser(userId: number): Promise<any> {
    const result = await this.repo
      .createQueryBuilder('income')
      .select('income.id', 'id')
      .addSelect('income.amount', 'amount')
      .addSelect('income.note', 'note')
      .addSelect('income.date', 'date')
      .where('income.user_id = :userId', { userId })
      .orderBy('income.date', 'DESC')
      .getRawMany();

    return result;
  }

  async getProcessMiniInSidebar(userId: number) {
    const month = new Date().getMonth() + 1;

    const data = await this.repo
      .createQueryBuilder('income')

      .select('income.month', 'month')

      .addSelect('SUM(income.amount)', 'totalIncome')

      .addSelect(
        `( 
      SELECT COALESCE(SUM(expense.amount), 0)
      FROM expenses expense
      WHERE expense.user_id = income.user_id
        AND expense.is_deleted = false
        AND EXTRACT(MONTH FROM expense.date::date) = income.month
    )`,
        'totalExpense',
      )

      .addSelect(
        `
    SUM(income.amount) - (
      SELECT COALESCE(SUM(expense.amount), 0)
      FROM expenses expense
      WHERE expense.user_id = income.user_id
        AND expense.is_deleted = false
        AND EXTRACT(MONTH FROM expense.date::date) = income.month
    )
    `,
        'used',
      )

      .where('income.month = :month', { month })

      .andWhere('income.user_id = :userId', { userId })

      .andWhere('income.is_deleted = false')

      .groupBy('income.month')

      .addGroupBy('income.user_id')

      .getRawOne();

    return data;
  }
}
