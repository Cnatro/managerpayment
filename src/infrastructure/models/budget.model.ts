import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('budgets')
export class BudgetModel extends BaseModel {
  @Column()
  name!: string;

  @Column()
  start_date!: string;

  @Column()
  end_date!: string;

  @Column('float')
  limit_amount!: number;

  @Column()
  user_id!: number;
}
