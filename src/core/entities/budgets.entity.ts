import { BaseEntity } from './base.entity';

export class Budget extends BaseEntity {
  constructor(
    public categoryId: number,
    public month: number,
    public limitAmount: number,
  ) {
    super();
  }
}
