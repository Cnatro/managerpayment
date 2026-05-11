import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('income')
export class IncomeModel extends BaseModel {
  @Column()
  user_id!: number;

  @Column()
  month!: number;

  @Column('float')
  amount!: number;

  @Column({ nullable: true })
  note!: string;
}
