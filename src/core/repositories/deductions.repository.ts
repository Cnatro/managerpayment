import { Deduction } from '../entities/deductions.entity';
import { DeductionFilter } from '../services/dto/filters/deductionFilter';

export interface DeductionRepository {
  create(data: Deduction): Promise<Deduction>;
  update(data: Deduction): Promise<Deduction>;
  delete(id: number): Promise<void>;
  findAll(userId: number): Promise<Deduction[]>;
  findById(id: number): Promise<Deduction | null>;
  findAllWithFilter(userId: number, query?: DeductionFilter): Promise<any>;
  sumAmountByUser(userId: number): Promise<number>;
}
