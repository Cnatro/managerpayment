/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import type { IncomeRepository } from '../../repositories/income.repository';
import type { ExpenseRepository } from '../../repositories/expenses.repository';

@Injectable()
export class IncomeQueryService {
  constructor(
    @Inject('IncomeRepository')
    private readonly incomeRepo: IncomeRepository,

    @Inject('ExpenseRepository')
    private readonly expensesRepo: ExpenseRepository,
  ) {}

  findAll() {
    return this.incomeRepo.findAll();
  }

  findById(id: number) {
    return this.incomeRepo.findById(id);
  }

  async findIncomeWithUser(user: any) {
    const totalAmountInMonth =
      await this.incomeRepo.findTotalAmountInMonthByUser(Number(user.id));
    const totalAmountInWeek = await this.incomeRepo.findTotalAmountInWeekByUser(
      Number(user.id),
    );

    const totalIncome = await this.incomeRepo.sumAmountByUser(Number(user.id));

    const totalExpense = await this.expensesRepo.sumAmountByUser(
      Number(user.id),
    );

    const currentMonth = new Date().getMonth() + 1;

    return {
      balance: totalIncome - totalExpense,
      income: totalIncome,
      expense: totalExpense,
      carrots: 14,

      currentMonth: currentMonth,

      chart: totalAmountInMonth,

      timeline: totalAmountInWeek,
    };
  }
}
