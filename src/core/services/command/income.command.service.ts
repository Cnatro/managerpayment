/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import type { IncomeRepository } from '../../repositories/income.repository';
import { Income } from '../../entities/income.entity';

@Injectable()
export class ImcomeCommandService {
  constructor(
    @Inject('IncomeRepository')
    private readonly imcomeRepo: IncomeRepository,
  ) {}

  create(dto: Income, user: any) {
    return this.imcomeRepo.create({
      ...dto,
      userId: user.id,
    });
  }

  update(dto: Income) {
    return this.imcomeRepo.update(dto);
  }

  delete(id: number) {
    return this.imcomeRepo.delete(id);
  }
}
