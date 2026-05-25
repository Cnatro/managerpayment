import { Deduction } from '../../core/entities/deductions.entity';
import { DeductionModel } from '../../infrastructure/models/deduction.model';

export class DeductionMapper {
  static toEntity(model: DeductionModel): Deduction {
    const deduction = new Deduction(
      model.user_id,
      model.month,
      model.category_id,
      model.amount,
      model.note,
    );

    deduction.id = model.id;

    return deduction;
  }

  static toModel(entity: Deduction): DeductionModel {
    const model = new DeductionModel();

    model.id = entity.id;
    model.user_id = entity.userId;
    model.month = entity.month;
    model.category_id = entity.categoryId;
    model.amount = entity.amount;
    model.note = entity.note;

    return model;
  }
}
