import { Saving } from '../../core/entities/saving.entity';
import { SavingModel } from '../../infrastructure/models/saving.model';

export class SavingMapper {
  static toEntity(model: SavingModel): Saving {
    const saving = new Saving(
      model.month,
      model.type,
      model.amount,
      model.note,
    );

    saving.id = model.id;

    return saving;
  }

  static toModel(entity: Saving): SavingModel {
    const model = new SavingModel();

    model.id = entity.id;
    model.month = entity.month;
    model.type = entity.type;
    model.amount = entity.amount;
    model.note = entity.note;

    return model;
  }
}
