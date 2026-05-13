/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Budget } from '../entities/budgets.entity';
import { BudgetFilter } from '../services/dto/filters/budgetFilter';

export interface BudgetRepository {
  create(data: Budget): Promise<Budget>;
  update(data: Budget): Promise<Budget>;
  delete(id: number): Promise<void>;
  findAllWithFilter(query: BudgetFilter, userId: number): Promise<Budget[]>;
  findById(id: number, userId: number): Promise<any | null>;
  findAll(): Promise<Budget[]>;
}
