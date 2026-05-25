/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeductionCommandService } from '../../core/services/command/deduction.command.service';
import { DeductionQueryService } from '../../core/services/query/deduction.query.service';
import { Deduction } from '../../core/entities/deductions.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DeductionFilter } from '../../core/services/dto/filters/deductionFilter';

@Controller('Deductions')
export class DeductionController {
  constructor(
    private readonly command: DeductionCommandService,
    private readonly query: DeductionQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Deduction, @CurrentUser() user: any) {
    return this.command.create(dto, Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() dto: Deduction) {
    return this.command.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.command.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllWithFilter(@CurrentUser() user: any, @Query() query: DeductionFilter) {
    return this.query.findAllWithFilter(Number(user.id), query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.query.findById(id);
  }
}
