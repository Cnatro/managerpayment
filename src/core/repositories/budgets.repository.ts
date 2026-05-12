import { Budget } from '../entities/budgets.entity';

export interface BudgetRepository {
  create(data: Budget): Promise<Budget>;
  update(data: Budget): Promise<Budget>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Budget[]>;
  findById(id: number): Promise<Budget | null>;
}
