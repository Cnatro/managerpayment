import { Inject, Injectable } from '@nestjs/common';
import type { SavingRepository } from '../../repositories/saving.repository';

@Injectable()
export class SavingQueryService {
  constructor(
    @Inject('SavingRepository')
    private readonly savingRepo: SavingRepository,
  ) {}

  findAll(userId: number) {
    return this.savingRepo.findAll(userId);
  }

  findById(id: number) {
    return this.savingRepo.findById(id);
  }
}
