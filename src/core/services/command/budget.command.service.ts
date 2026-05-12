import { Inject, Injectable } from '@nestjs/common';
import type { BudgetRepository } from '../../repositories/budgets.repository';
import { Budget } from '../../entities/budgets.entity';

@Injectable()
export class BudgetCommandService {
  constructor(
    @Inject('BudgetRepository')
    private readonly budgetRepo: BudgetRepository,
  ) {}

  create(dto: Budget) {
    return this.budgetRepo.create(dto);
  }

  update(dto: Budget) {
    return this.budgetRepo.update(dto);
  }

  delete(id: number) {
    return this.budgetRepo.delete(id);
  }
}
