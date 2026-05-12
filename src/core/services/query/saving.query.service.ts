import { Inject, Injectable } from '@nestjs/common';
import type { SavingRepository } from '../../repositories/saving.repository';

@Injectable()
export class SavingQueryService {
  constructor(
    @Inject('SavingRepository')
    private readonly savingRepo: SavingRepository,
  ) {}

  findAll() {
    return this.savingRepo.findAll();
  }

  findById(id: number) {
    return this.savingRepo.findById(id);
  }
}
