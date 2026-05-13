/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import type { BudgetRepository } from '../../repositories/budgets.repository';
import { BudgetFilter } from '../dto/filters/budgetFilter';

@Injectable()
export class BudgetQueryService {
  constructor(
    @Inject('BudgetRepository')
    private readonly budgetRepo: BudgetRepository,
  ) {}

  findAll(query: BudgetFilter, userId: number) {
    return this.budgetRepo.findAll(query, userId);
  }

  async findById(id: number, userId: number) {
    const rows = await this.budgetRepo.findById(id, userId);

    if (!rows || rows.length === 0) {
      return null;
    }

    const firstRow = rows[0];

    const used = rows.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const budget = {
      id: firstRow.id,
      limitAmount: Number(firstRow.limitAmount),
      startDate: firstRow.startDate,
      endDate: firstRow.endDate,

      used,

      remainingAmount: Number(firstRow.limitAmount) - used,

      expenses: rows
        .filter((item) => item.expenseId)
        .map((item) => ({
          id: item.expenseId,
          amount: Number(item.amount),
          week: item.week,
          month: item.month,
          note: item.note,
          date: item.date,
          categoryName: item.categoryName,
        })),
    };

    return budget;
  }
}
