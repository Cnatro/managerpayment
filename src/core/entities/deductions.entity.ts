import { BaseEntity } from './base.entity';

export class Deduction extends BaseEntity {
  constructor(
    public userId: number,
    public month: number,
    public category: string,
    public amount: number,
    public note: string,
  ) {
    super();
  }
}
