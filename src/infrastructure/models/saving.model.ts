import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('saving')
export class SavingModel extends BaseModel {
  @Column()
  month!: number;

  @Column()
  type!: string;

  @Column('float')
  amount!: number;

  @Column({ nullable: true })
  note!: string;
}
