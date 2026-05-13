/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingRepository } from '../../core/repositories/saving.repository';
import { SavingModel } from '../models/saving.model';
import { Saving } from '../../core/entities/saving.entity';
import { SavingMapper } from '../../interfaces/mappers/saving.mapper';

@Injectable()
export class SavingRepositoryImpl implements SavingRepository {
  constructor(
    @InjectRepository(SavingModel)
    private readonly repo: Repository<SavingModel>,
  ) {}

  async create(data: Saving): Promise<Saving> {
    const saved = await this.repo.save(SavingMapper.toModel(data));
    return SavingMapper.toEntity(saved);
  }

  async update(data: Saving): Promise<Saving> {
    const existing = await this.repo.findOneBy({ id: data.id });

    if (!existing) throw new Error('Saving not found');

    const merged = this.repo.merge(existing, SavingMapper.toModel(data));
    const saved = await this.repo.save(merged);

    return SavingMapper.toEntity(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(userId: number): Promise<Saving[]> {
    const data = await this.repo.find({ where: { user_id: userId } });
    return data.map(SavingMapper.toEntity);
  }

  async findById(id: number): Promise<Saving | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? SavingMapper.toEntity(data) : null;
  }

  async sumAmountByUser(userId: number): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('saving')
      .select('SUM(saving.amount)', 'total')
      .where('saving.user_id = :userId', {
        userId,
      })
      .getRawOne();

    return Number(result.total || 0);
  }
}
