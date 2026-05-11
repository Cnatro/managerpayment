import { BaseEntity } from './base.entity';

export class Expense extends BaseEntity {
  constructor(
    public userId: number,
    public categoryId: number,
    public date: string,
    public week: number,
    public month: number,
    public amount: number,
    public note: string,
  ) {
    super();
  }
}
