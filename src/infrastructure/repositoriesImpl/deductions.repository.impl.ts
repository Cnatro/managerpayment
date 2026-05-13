/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeductionModel } from '../models/deduction.model';
import { DeductionMapper } from '../../interfaces/mappers/deductions.mapper';
import { Deduction } from '../../core/entities/deductions.entity';
import { DeductionRepository } from '../../core/repositories/deductions.repository';

@Injectable()
export class DeductionRepositoryImpl implements DeductionRepository {
  constructor(
    @InjectRepository(DeductionModel)
    private readonly repo: Repository<DeductionModel>,
  ) {}

  async create(data: Deduction): Promise<Deduction> {
    const saved = await this.repo.save(DeductionMapper.toModel(data));
    return DeductionMapper.toEntity(saved);
  }

  async update(data: Deduction): Promise<Deduction> {
    const existing = await this.repo.findOneBy({ id: data.id });

    if (!existing) throw new Error('Deduction not found');

    const merged = this.repo.merge(existing, DeductionMapper.toModel(data));
    const saved = await this.repo.save(merged);

    return DeductionMapper.toEntity(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(userId: number): Promise<Deduction[]> {
    const data = await this.repo.find({ where: { user_id: userId } });
    return data.map(DeductionMapper.toEntity);
  }

  async findById(id: number): Promise<Deduction | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? DeductionMapper.toEntity(data) : null;
  }
}
