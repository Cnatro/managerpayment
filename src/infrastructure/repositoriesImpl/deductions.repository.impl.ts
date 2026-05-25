/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeductionModel } from '../models/deduction.model';
import { DeductionMapper } from '../../interfaces/mappers/deductions.mapper';
import { Deduction } from '../../core/entities/deductions.entity';
import { DeductionRepository } from '../../core/repositories/deductions.repository';
import { DeductionFilter } from '../../core/services/dto/filters/deductionFilter';

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
    const entity = await this.repo.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Category not found');
    }

    entity.is_deleted = true;
    await this.repo.save(entity);
  }

  async findAll(userId: number): Promise<Deduction[]> {
    const data = await this.repo.find({ where: { user_id: userId } });
    return data.map(DeductionMapper.toEntity);
  }

  async findById(id: number): Promise<Deduction | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? DeductionMapper.toEntity(data) : null;
  }

  async findAllWithFilter(
    userId: number,
    query?: DeductionFilter,
  ): Promise<any> {
    const page = query?.page || 1;

    const size = query?.size || 10;

    const queryBuilder = this.repo
      .createQueryBuilder('deduction')

      // JOIN CATEGORY
      .leftJoinAndSelect('deduction.category', 'category')

      .where('deduction.user_id = :userId', {
        userId,
      })

      .andWhere('deduction.is_deleted = false');

    // PAGINATION
    queryBuilder.skip((page - 1) * size);

    queryBuilder.take(size);

    // ORDER
    queryBuilder.orderBy('deduction.created_at', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data: data.map((item) => ({
        ...DeductionMapper.toEntity(item),

        category: item.category
          ? {
              id: item.category.id,
              name: item.category.name,
            }
          : null,
      })),

      total,

      page,

      size,

      totalPages: Math.ceil(total / size),
    };
  }
}
