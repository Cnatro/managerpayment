import { Budget } from '../../core/entities/budgets.entity';
import { BudgetModel } from '../../infrastructure/models/budget.model';

export class BudgetMapper {
  static toEntity(model: BudgetModel): Budget {
    const budget = new Budget(
      model.category_id,
      model.month,
      model.limit_amount,
    );

    budget.id = model.id;
    budget.createdAt = model.created_at;
    budget.updatedAt = model.updated_at;

    return budget;
  }

  static toModel(entity: Budget): BudgetModel {
    const model = new BudgetModel();

    model.id = entity.id;
    model.category_id = entity.categoryId;
    model.month = entity.month;
    model.limit_amount = entity.limitAmount;

    return model;
  }
}
