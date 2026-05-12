import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IncomeQueryService } from '../../core/services/query/income.query.service';
import { ImcomeCommandService } from '../../core/services/command/income.command.service';
import { Income } from '../../core/entities/income.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('incomes')
export class IncomeController {
  constructor(
    private readonly command: ImcomeCommandService,
    private readonly query: IncomeQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Income, @CurrentUser() user: any) {
    return this.command.create(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() dto: Income) {
    return this.command.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.command.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: any) {
    return this.query.findIncomeWithUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.query.findById(id);
  }
}
