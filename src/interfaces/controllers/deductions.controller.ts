import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeductionCommandService } from '../../core/services/command/deduction.command.service';
import { DeductionQueryService } from '../../core/services/query/deduction.query.service';
import { Deduction } from '../../core/entities/deductions.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';

@Controller('Deductions')
export class DeductionController {
  constructor(
    private readonly command: DeductionCommandService,
    private readonly query: DeductionQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Deduction) {
    return this.command.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
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
  findAll() {
    return this.query.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.query.findById(id);
  }
}
