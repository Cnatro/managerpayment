import { Inject, Injectable } from '@nestjs/common';
import type { DeductionRepository } from '../../repositories/deductions.repository';
import { Deduction } from '../../entities/deductions.entity';

@Injectable()
export class DeductionCommandService {
  constructor(
    @Inject('DeductionRepository')
    private readonly deductionRepo: DeductionRepository,
  ) {}

  create(dto: Deduction) {
    return this.deductionRepo.create(dto);
  }

  update(dto: Deduction) {
    return this.deductionRepo.update(dto);
  }

  delete(id: number) {
    return this.deductionRepo.delete(id);
  }
}
