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
import { BudgetCommandService } from '../../core/services/command/budget.command.service';
import { BudgetQueryService } from '../../core/services/query/budget.query.service';
import { Budget } from '../../core/entities/budgets.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';
import { BudgetFilter } from '../../core/services/dto/filters/budgetFilter';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('Budgets')
export class BudgetController {
  constructor(
    private readonly command: BudgetCommandService,
    private readonly query: BudgetQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Budget, @CurrentUser() user: any) {
    return this.command.create(dto, Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
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
  findAll(@Query() query: BudgetFilter, @CurrentUser() user: any) {
    return this.query.findAllWithFilter(query, Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number, @CurrentUser() user: any) {
    return this.query.findById(id, Number(user.id));
  }
}
