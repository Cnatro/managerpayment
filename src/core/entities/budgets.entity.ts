import { BaseEntity } from './base.entity';

export class Budget extends BaseEntity {
  constructor(
    public name: string,
    public startDate: string,
    public endDate: string,
    public limitAmount: number,
    public userId: number,
  ) {
    super();
  }
}
