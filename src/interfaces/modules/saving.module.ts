import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingModel } from '../../infrastructure/models/saving.model';
import { SavingController } from '../controllers/saving.controller';
import { SavingCommandService } from '../../core/services/command/saving.command.service';
import { SavingQueryService } from '../../core/services/query/saving.query.service';
import { SavingRepositoryImpl } from '../../infrastructure/repositoriesImpl/saving.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([SavingModel])],
  controllers: [SavingController],
  providers: [
    SavingCommandService,
    SavingQueryService,
    {
      provide: 'SavingRepository',
      useClass: SavingRepositoryImpl,
    },
  ],
  exports: ['SavingRepository'],
})
export class SavingModule {}
