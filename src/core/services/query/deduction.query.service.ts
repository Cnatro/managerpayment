import { Inject, Injectable } from '@nestjs/common';
import type { DeductionRepository } from '../../repositories/deductions.repository';

@Injectable()
export class DeductionQueryService {
  constructor(
    @Inject('DeductionRepository')
    private readonly deductionRepo: DeductionRepository,
  ) {}

  findAll() {
    return this.deductionRepo.findAll();
  }

  findById(id: number) {
    return this.deductionRepo.findById(id);
  }
}
