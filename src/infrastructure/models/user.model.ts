import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('users')
export class UserModel extends BaseModel {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  color!: string;
}
