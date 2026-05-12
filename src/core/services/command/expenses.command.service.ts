import { Inject, Injectable } from '@nestjs/common';
import type { ExpenseRepository } from '../../repositories/expenses.repository';
import { Expense } from '../../entities/expenses.entity';

@Injectable()
export class ExpensesCommandService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expensesRepo: ExpenseRepository,
  ) {}

  create(dto: Expense) {
    return this.expensesRepo.create(dto);
  }

  update(dto: Expense) {
    return this.expensesRepo.update(dto);
  }

  delete(id: number) {
    return this.expensesRepo.delete(id);
  }
}
