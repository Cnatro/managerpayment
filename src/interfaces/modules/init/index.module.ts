import { AuthModule } from '../auth.module';
import { BudgetModule } from '../budget.module';
import { CategoryModule } from '../category.module';
import { ChartsModule } from '../charts.module';
import { DeductionModule } from '../deductions.module';
import { ExpenseModule } from '../expenses.module';
import { IncomeModule } from '../income.module';
import { SavingModule } from '../saving.module';
import { UserModule } from '../user.module';

export const MODULES = [
  CategoryModule,
  UserModule,
  BudgetModule,
  DeductionModule,
  ExpenseModule,
  IncomeModule,
  SavingModule,
  ChartsModule,
  AuthModule,
];
