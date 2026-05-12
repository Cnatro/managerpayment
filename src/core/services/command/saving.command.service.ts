import { Inject, Injectable } from '@nestjs/common';
import type { SavingRepository } from '../../repositories/saving.repository';
import { Saving } from '../../entities/saving.entity';

@Injectable()
export class SavingCommandService {
  constructor(
    @Inject('SavingRepository')
    private readonly savingRepo: SavingRepository,
  ) {}

  create(dto: Saving) {
    return this.savingRepo.create(dto);
  }

  update(dto: Saving) {
    return this.savingRepo.update(dto);
  }

  delete(id: number) {
    return this.savingRepo.delete(id);
  }
}
