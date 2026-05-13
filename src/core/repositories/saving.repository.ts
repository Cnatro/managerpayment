import { Saving } from '../entities/saving.entity';

export interface SavingRepository {
  create(data: Saving): Promise<Saving>;
  update(data: Saving): Promise<Saving>;
  delete(id: number): Promise<void>;
  findAll(userId: number): Promise<Saving[]>;
  findById(id: number): Promise<Saving | null>;
  sumAmountByUser(userId: number): Promise<number>;
}
