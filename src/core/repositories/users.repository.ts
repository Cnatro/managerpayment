import { User } from '../entities/users.entity';

export interface UserRepository {
  create(data: User): Promise<User>;
  update(data: User): Promise<User>;
  delete(id: number): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
