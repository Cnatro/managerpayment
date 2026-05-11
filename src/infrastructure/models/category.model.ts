import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('categories')
export class CategoryModel extends BaseModel {
  @Column()
  name!: string;

  @Column()
  color!: string;

  @Column()
  icon!: string;
}
