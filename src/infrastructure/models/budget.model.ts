import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('budgets')
export class BudgetModel extends BaseModel {
  @Column()
  category_id!: number;

  @Column()
  month!: number;

  @Column('float')
  limit_amount!: number;

  @Column()
  user_id!: number;
}
