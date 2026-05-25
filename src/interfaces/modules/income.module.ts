import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeModel } from '../../infrastructure/models/income.model';
import { IncomeController } from '../controllers/income.controller';
import { ImcomeCommandService } from '../../core/services/command/income.command.service';
import { IncomeQueryService } from '../../core/services/query/income.query.service';
import { IncomeRepositoryImpl } from '../../infrastructure/repositoriesImpl/income.repository.impl';
import { ExpenseModel } from '../../infrastructure/models/expense.model';
import { ExpensesRepositoryImpl } from '../../infrastructure/repositoriesImpl/expenses.repository.impl';
import { DeductionRepositoryImpl } from '../../infrastructure/repositoriesImpl/deductions.repository.impl';
import { DeductionModel } from '../../infrastructure/models/deduction.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([IncomeModel, ExpenseModel, DeductionModel]),
  ],
  controllers: [IncomeController],
  providers: [
    ImcomeCommandService,
    IncomeQueryService,
    {
      provide: 'IncomeRepository',
      useClass: IncomeRepositoryImpl,
    },
    {
      provide: 'ExpenseRepository',
      useClass: ExpensesRepositoryImpl,
    },
    {
      provide: 'DeductionRepository',
      useClass: DeductionRepositoryImpl,
    },
  ],
  exports: ['IncomeRepository'],
})
export class IncomeModule {}
