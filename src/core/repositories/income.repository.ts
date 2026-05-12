import { Income } from '../entities/income.entity';

export interface IncomeRepository {
  create(data: Income): Promise<Income>;
  update(data: Income): Promise<Income>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Income[]>;
  findById(id: number): Promise<Income | null>;
  sumAmountByUser(userId: number): Promise<number>;
  findTotalAmountInMonthByUser(userId: number): Promise<any>;
  findTotalAmountInWeekByUser(userId: number): Promise<any>;
}
