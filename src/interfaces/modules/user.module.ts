import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCommandService } from '../../core/services/command/user.command.service';
import { UserQueryService } from '../../core/services/query/user.query.service';
import { UserRepositoryImpl } from '../../infrastructure/repositoriesImpl/user.repository.impl';
import { UserModel } from '../../infrastructure/models/user.model';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    UserCommandService,
    UserQueryService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['UserRepository'],
})
export class UserModule {}
