/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from '../models/user.model';
import { UserRepository } from '../../core/repositories/users.repository';
import { User } from '../../core/entities/users.entity';
import { UserMapper } from '../../interfaces/mappers/users.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repo: Repository<UserModel>,
  ) {}

  async create(data: User): Promise<User> {
    const saved = await this.repo.save(UserMapper.toModel(data));
    return UserMapper.toEntity(saved);
  }

  async update(data: User): Promise<User> {
    const existing = await this.repo.findOneBy({ id: data.id });

    if (!existing) throw new Error('User not found');

    const merged = this.repo.merge(existing, UserMapper.toModel(data));
    const saved = await this.repo.save(merged);

    return UserMapper.toEntity(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(): Promise<User[]> {
    const data = await this.repo.find();
    return data.map(UserMapper.toEntity);
  }

  async findById(id: number): Promise<User | null> {
    const data = await this.repo.findOneBy({ id });
    return data ? UserMapper.toEntity(data) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.repo.findOne({ where: { email: email } });
    return data ? UserMapper.toEntity(data) : null;
  }
}
