import { Budget } from '../../core/entities/budgets.entity';
import { BudgetModel } from '../../infrastructure/models/budget.model';

export class BudgetMapper {
  static toEntity(model: BudgetModel): Budget {
    const budget = new Budget(
      model.name,
      model.start_date,
      model.end_date,
      model.limit_amount,
      model.user_id,
    );

    budget.id = model.id;
    budget.createdAt = model.created_at;
    budget.updatedAt = model.updated_at;

    return budget;
  }

  static toModel(entity: Budget): BudgetModel {
    const model = new BudgetModel();

    model.id = entity.id;
    model.start_date = entity.startDate;
    model.end_date = entity.endDate;
    model.limit_amount = entity.limitAmount;
    model.user_id = entity.userId;
    model.name = entity.name;

    return model;
  }
}
