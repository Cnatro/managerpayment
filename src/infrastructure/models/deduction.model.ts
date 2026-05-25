import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { CategoryModel } from './category.model';

@Entity('deductions')
export class DeductionModel extends BaseModel {
  @Column()
  user_id!: number;

  @Column()
  month!: number;

  @Column()
  category_id!: number;

  @Column('float')
  amount!: number;

  @Column({ nullable: true })
  note!: string;

  @ManyToOne(() => CategoryModel)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryModel;
}
