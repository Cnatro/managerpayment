import { Income } from '../../core/entities/income.entity';
import { IncomeModel } from '../../infrastructure/models/income.model';

export class IncomeMapper {
  static toEntity(model: IncomeModel): Income {
    const income = new Income(
      model.user_id,
      model.month,
      model.amount,
      model.note,
    );

    income.id = model.id;
    income.createdAt = model.created_at;

    return income;
  }

  static toModel(entity: Income): IncomeModel {
    const model = new IncomeModel();

    model.id = entity.id;
    model.user_id = entity.userId;
    model.month = entity.month;
    model.amount = entity.amount;
    model.note = entity.note;

    return model;
  }
}
