/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import type { IncomeRepository } from '../../repositories/income.repository';
import type { ExpenseRepository } from '../../repositories/expenses.repository';
import type { DeductionRepository } from '../../repositories/deductions.repository';

@Injectable()
export class IncomeQueryService {
  constructor(
    @Inject('IncomeRepository')
    private readonly incomeRepo: IncomeRepository,

    @Inject('ExpenseRepository')
    private readonly expensesRepo: ExpenseRepository,

    @Inject('DeductionRepository')
    private readonly deductionRepo: DeductionRepository,
  ) {}

  findAll(userId: number) {
    return this.incomeRepo.findAll(userId);
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

    const totalDeduction = await this.deductionRepo.sumAmountByUser(
      Number(user.id),
    );

    const currentMonth = new Date().getMonth() + 1;

    return {
      balance: totalIncome - totalExpense - totalDeduction,
      income: totalIncome,
      expense: totalExpense,
      deduction: totalDeduction,
      carrots: 14,

      currentMonth: currentMonth,

      chart: totalAmountInMonth,

      timeline: totalAmountInWeek,
    };
  }
}
