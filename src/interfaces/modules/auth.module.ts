import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModel } from '../../infrastructure/models/user.model';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../core/services/auth/auth.service';
import { PasswordService } from '../../core/services/auth/password.service';
import { JwtStrategy } from '../../core/services/auth/jwt.strategy';
import { UserRepositoryImpl } from '../../infrastructure/repositoriesImpl/user.repository.impl';
import { IncomeRepositoryImpl } from '../../infrastructure/repositoriesImpl/income.repository.impl';
import { ExpensesRepositoryImpl } from '../../infrastructure/repositoriesImpl/expenses.repository.impl';
import { SavingRepositoryImpl } from '../../infrastructure/repositoriesImpl/saving.repository.impl';
import { IncomeModel } from '../../infrastructure/models/income.model';
import { ExpenseModel } from '../../infrastructure/models/expense.model';
import { SavingModel } from '../../infrastructure/models/saving.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      IncomeModel,
      ExpenseModel,
      SavingModel,
    ]),

    PassportModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,

    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'IncomeRepository',
      useClass: IncomeRepositoryImpl,
    },
    {
      provide: 'ExpenseRepository',
      useClass: ExpensesRepositoryImpl,
    },
    {
      provide: 'SavingRepository',
      useClass: SavingRepositoryImpl,
    },
  ],

  exports: [AuthService],
})
export class AuthModule {}
