import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('expenses')
export class ExpenseModel extends BaseModel {
  @Column()
  user_id!: number;

  @Column()
  category_id!: number;

  @Column()
  date!: string;

  @Column()
  week!: number;

  @Column()
  month!: number;

  @Column('float')
  amount!: number;

  @Column({ nullable: true })
  note!: string;
}
