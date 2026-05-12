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
import { SavingCommandService } from '../../core/services/command/saving.command.service';
import { SavingQueryService } from '../../core/services/query/saving.query.service';
import { Saving } from '../../core/entities/saving.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';

@Controller('Savings')
export class SavingController {
  constructor(
    private readonly command: SavingCommandService,
    private readonly query: SavingQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Saving) {
    return this.command.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() dto: Saving) {
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
