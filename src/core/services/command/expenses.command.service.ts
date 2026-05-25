/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import type { ExpenseRepository } from '../../repositories/expenses.repository';
import { Expense } from '../../entities/expenses.entity';
import { getWeekOfMonth } from 'date-fns';

@Injectable()
export class ExpensesCommandService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expensesRepo: ExpenseRepository,
  ) {}

  create(dto: Expense, user: any) {
    const date = new Date(dto.date);

    const month = date.getMonth() + 1;

    const week = getWeekOfMonth(date);
    return this.expensesRepo.create({
      ...dto,
      userId: Number(user.id),
      week: week,
      month: month,
    });
  }

  update(dto: Expense) {
    return this.expensesRepo.update(dto);
  }

  delete(id: number) {
    return this.expensesRepo.delete(id);
  }
}
