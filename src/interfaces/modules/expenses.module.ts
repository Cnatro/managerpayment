import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModel } from '../../infrastructure/models/expense.model';
import { ExpenseController } from '../controllers/expenses.controller';
import { ExpensesCommandService } from '../../core/services/command/expenses.command.service';
import { ExpenseQueryService } from '../../core/services/query/expenses.query.service';
import { ExpensesRepositoryImpl } from '../../infrastructure/repositoriesImpl/expenses.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseModel])],
  controllers: [ExpenseController],
  providers: [
    ExpensesCommandService,
    ExpenseQueryService,
    {
      provide: 'ExpenseRepository',
      useClass: ExpensesRepositoryImpl,
    },
  ],
  exports: ['ExpenseRepository'],
})
export class ExpenseModule {}
