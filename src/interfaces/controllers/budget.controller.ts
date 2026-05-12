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
import { BudgetCommandService } from '../../core/services/command/budget.command.service';
import { BudgetQueryService } from '../../core/services/query/budget.query.service';
import { Budget } from '../../core/entities/budgets.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';

@Controller('Budgets')
export class BudgetController {
  constructor(
    private readonly command: BudgetCommandService,
    private readonly query: BudgetQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Budget) {
    return this.command.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() dto: Budget) {
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
