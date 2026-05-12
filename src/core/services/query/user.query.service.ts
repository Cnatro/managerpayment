import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../../repositories/users.repository';

@Injectable()
export class UserQueryService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  findAll() {
    return this.userRepo.findAll();
  }

  findById(id: number) {
    return this.userRepo.findById(id);
  }
}
