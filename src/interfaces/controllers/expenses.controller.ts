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
import { ExpensesCommandService } from '../../core/services/command/expenses.command.service';
import { ExpenseQueryService } from '../../core/services/query/expenses.query.service';
import { Expense } from '../../core/entities/expenses.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';

@Controller('Expenses')
export class ExpenseController {
  constructor(
    private readonly command: ExpensesCommandService,
    private readonly query: ExpenseQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Expense) {
    return this.command.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() dto: Expense) {
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
