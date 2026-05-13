import { Deduction } from '../entities/deductions.entity';

export interface DeductionRepository {
  create(data: Deduction): Promise<Deduction>;
  update(data: Deduction): Promise<Deduction>;
  delete(id: number): Promise<void>;
  findAll(userId: number): Promise<Deduction[]>;
  findById(id: number): Promise<Deduction | null>;
}
