import { Expense } from '../entities/expenses.entity';

export interface ExpenseRepository {
  create(data: Expense): Promise<Expense>;
  update(data: Expense): Promise<Expense>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  sumAmountByUser(userId: number): Promise<number>;
}
