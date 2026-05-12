import { Category } from '../../core/entities/categories.entity';
import { CategoryModel } from '../../infrastructure/models/category.model';

export class CategoryMapper {
  static toEntity(model: CategoryModel): Category {
    const entity = new Category(model.name, model.color, model.icon);
    entity.id = model.id;
    return entity;
  }

  static toModel(entity: Category): CategoryModel {
    const model = new CategoryModel();
    model.id = entity.id;
    model.name = entity.name;
    model.color = entity.color;
    model.icon = entity.icon;
    return model;
  }
}
