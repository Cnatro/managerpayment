import { Module } from '@nestjs/common';
import { ChartsController } from '../controllers/chart.controler';
import { ChartsQueryService } from '../../core/services/query/charts.query.service';
import { ExpensesRepositoryImpl } from '../../infrastructure/repositoriesImpl/expenses.repository.impl';
import { IncomeRepositoryImpl } from '../../infrastructure/repositoriesImpl/income.repository.impl';
import { SavingRepositoryImpl } from '../../infrastructure/repositoriesImpl/saving.repository.impl';
import { DeductionRepositoryImpl } from '../../infrastructure/repositoriesImpl/deductions.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModel } from '../../infrastructure/models/expense.model';
import { IncomeModel } from '../../infrastructure/models/income.model';
import { SavingModel } from '../../infrastructure/models/saving.model';
import { DeductionModel } from '../../infrastructure/models/deduction.model';
import { CategoryRepositoryImpl } from '../../infrastructure/repositoriesImpl/category.repository.impl';
import { CategoryModel } from '../../infrastructure/models/category.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExpenseModel,
      IncomeModel,
      SavingModel,
      DeductionModel,
      CategoryModel,
    ]),
  ],
  controllers: [ChartsController],
  providers: [
    ChartsQueryService,

    {
      provide: 'ExpenseRepository',
      useClass: ExpensesRepositoryImpl,
    },
    {
      provide: 'IncomeRepository',
      useClass: IncomeRepositoryImpl,
    },
    {
      provide: 'SavingRepository',
      useClass: SavingRepositoryImpl,
    },
    {
      provide: 'DeductionRepository',
      useClass: DeductionRepositoryImpl,
    },
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepositoryImpl,
    },
  ],
  exports: [ChartsQueryService],
})
export class ChartsModule {}
