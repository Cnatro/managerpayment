import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetModel } from '../../infrastructure/models/budget.model';
import { BudgetController } from '../controllers/budget.controller';
import { BudgetCommandService } from '../../core/services/command/budget.command.service';
import { BudgetQueryService } from '../../core/services/query/budget.query.service';
import { BudgetRepositoryImpl } from '../../infrastructure/repositoriesImpl/budgets.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetModel])],
  controllers: [BudgetController],
  providers: [
    BudgetCommandService,
    BudgetQueryService,
    {
      provide: 'BudgetRepository',
      useClass: BudgetRepositoryImpl,
    },
  ],
  exports: ['BudgetRepository'],
})
export class BudgetModule {}
