import { Inject, Injectable } from '@nestjs/common';
import type { DeductionRepository } from '../../repositories/deductions.repository';

@Injectable()
export class DeductionQueryService {
  constructor(
    @Inject('DeductionRepository')
    private readonly deductionRepo: DeductionRepository,
  ) {}

  findAll(userId: number) {
    return this.deductionRepo.findAll(userId);
  }

  findById(id: number) {
    return this.deductionRepo.findById(id);
  }
}
