/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import type { UserRepository } from '../../repositories/users.repository';
import { PasswordService } from './password.service';
import { User } from '../../entities/users.entity';
import type { IncomeRepository } from '../../repositories/income.repository';
import type { ExpenseRepository } from '../../repositories/expenses.repository';
import type { SavingRepository } from '../../repositories/saving.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,

    @Inject('IncomeRepository')
    private readonly imcomeRepo: IncomeRepository,

    @Inject('ExpenseRepository')
    private readonly expensesRepo: ExpenseRepository,

    @Inject('SavingRepository')
    private readonly savingRepo: SavingRepository,

    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  // COMMAND
  async register(name: string, email: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);

    if (existing) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = new User(name, email, hashedPassword, '');

    return this.userRepo.create(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    const isMatch = await this.passwordService.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken: token,
      user,
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepo.findById(userId);

    const totalIncome = await this.imcomeRepo.sumAmountByUser(userId);

    const totalExpense = await this.expensesRepo.sumAmountByUser(userId);

    const totalSaving = await this.savingRepo.sumAmountByUser(userId);

    const balance = totalIncome - totalExpense + totalSaving;

    return {
      user,

      financialStats: {
        totalIncome,
        totalExpense,
        totalSaving,
        currentBalance: balance,
      },

      rabbit: {
        level: Math.floor(balance / 1000000),
        title:
          balance > 50000000
            ? 'Bunny Millionaire'
            : balance > 20000000
              ? 'Carrot Investor'
              : 'Saving Rabbit',

        exp: 75,

        mood: totalExpense > totalIncome ? 'tired' : 'happy',
      },

      streak: {
        currentDays: 14,
      },

      achievements: ['First Save', 'No Spending 7 Days'],

      recentActivities: [
        {
          type: 'income',
          amount: 2000000,
        },
        {
          type: 'expense',
          amount: 500000,
        },
      ],

      goals: [
        {
          name: 'Mua xe',
          target: 50000000,
          current: totalSaving,
        },
      ],
    };
  }
}
