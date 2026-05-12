import { Inject, Injectable } from '@nestjs/common';
import type { BudgetRepository } from '../../repositories/budgets.repository';

@Injectable()
export class BudgetQueryService {
  constructor(
    @Inject('BudgetRepository')
    private readonly budgetRepo: BudgetRepository,
  ) {}

  findAll() {
    return this.budgetRepo.findAll();
  }

  findById(id: number) {
    return this.budgetRepo.findById(id);
  }
}
