import { User } from '../../core/entities/users.entity';
import { UserModel } from '../../infrastructure/models/user.model';

export class UserMapper {
  static toEntity(model: UserModel): User {
    const user = new User(model.name, model.email, model.password, model.color);

    user.id = model.id;
    user.createdAt = model.created_at;
    user.updatedAt = model.updated_at;

    return user;
  }

  static toModel(entity: User): UserModel {
    const model = new UserModel();

    model.id = entity.id;
    model.name = entity.name;
    model.email = entity.email;
    model.password = entity.password;
    model.color = entity.color;

    return model;
  }
}
