import { BaseEntity } from './base.entity';

export class Income extends BaseEntity {
  constructor(
    public userId: number,
    public month: number,
    public amount: number,
    public note: string,
  ) {
    super();
  }
}
