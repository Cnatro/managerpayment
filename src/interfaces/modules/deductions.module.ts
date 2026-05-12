import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeductionModel } from '../../infrastructure/models/deduction.model';
import { DeductionController } from '../controllers/deductions.controller';
import { DeductionCommandService } from '../../core/services/command/deduction.command.service';
import { DeductionQueryService } from '../../core/services/query/deduction.query.service';
import { DeductionRepositoryImpl } from '../../infrastructure/repositoriesImpl/deductions.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([DeductionModel])],
  controllers: [DeductionController],
  providers: [
    DeductionCommandService,
    DeductionQueryService,
    {
      provide: 'DeductionRepository',
      useClass: DeductionRepositoryImpl,
    },
  ],
  exports: ['DeductionRepository'],
})
export class DeductionModule {}
