/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable } from '@nestjs/common';
import type { DeductionRepository } from '../../repositories/deductions.repository';
import { DeductionFilter } from '../dto/filters/deductionFilter';

@Injectable()
export class DeductionQueryService {
  constructor(
    @Inject('DeductionRepository')
    private readonly deductionRepo: DeductionRepository,
  ) {}

  async findAllWithFilter(userId: number, query: DeductionFilter) {
    return await this.deductionRepo.findAllWithFilter(userId, query);
  }

  findById(id: number) {
    return this.deductionRepo.findById(id);
  }
}
