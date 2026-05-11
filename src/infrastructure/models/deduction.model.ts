import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('deductions')
export class DeductionModel extends BaseModel {
  @Column()
  user_id!: number;

  @Column()
  month!: number;

  @Column()
  category!: string;

  @Column('float')
  amount!: number;

  @Column({ nullable: true })
  note!: string;
}
