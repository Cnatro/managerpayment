import { Expense } from '../../core/entities/expenses.entity';
import { ExpenseModel } from '../../infrastructure/models/expense.model';

export class ExpenseMapper {
  static toEntity(model: ExpenseModel): Expense {
    const expense = new Expense(
      model.user_id,
      model.category_id,
      model.date,
      model.week,
      model.month,
      model.amount,
      model.note,
    );

    expense.id = model.id;

    return expense;
  }

  static toModel(entity: Expense): ExpenseModel {
    const model = new ExpenseModel();

    model.id = entity.id;
    model.user_id = entity.userId;
    model.category_id = entity.categoryId;
    model.date = entity.date;
    model.week = entity.week;
    model.month = entity.month;
    model.amount = entity.amount;
    model.note = entity.note;

    return model;
  }
}
