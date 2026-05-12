import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/users.entity';
import type { UserRepository } from '../../repositories/users.repository';

@Injectable()
export class UserCommandService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  create(dto: User) {
    return this.userRepo.create(dto);
  }

  update(dto: User) {
    return this.userRepo.update(dto);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
