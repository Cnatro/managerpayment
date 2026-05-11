import { BaseEntity } from './base.entity';

export class Category extends BaseEntity {
  constructor(
    public name: string,
    public color: string,
    public icon: string,
  ) {
    super();
  }
}
