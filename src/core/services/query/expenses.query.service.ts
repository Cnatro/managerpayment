import { Inject, Injectable } from '@nestjs/common';
import type { ExpenseRepository } from '../../repositories/expenses.repository';

@Injectable()
export class ExpenseQueryService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expenseRepo: ExpenseRepository,
  ) {}

  findAll(userId: number) {
    return this.expenseRepo.findAll(userId);
  }

  findById(id: number) {
    return this.expenseRepo.findById(id);
  }
}
