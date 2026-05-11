import { BaseEntity } from './base.entity';

export class Saving extends BaseEntity {
  constructor(
    public month: number,
    public type: string,
    public amount: number,
    public note: string,
  ) {
    super();
  }
}
