// src/interfaces/controllers/category.controller.ts
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
import { CategoryCommandService } from '../../core/services/command/category.command.service';
import { CategoryQueryService } from '../../core/services/query/category.query.service';
import { Category } from '../../core/entities/categories.entity';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';

@Controller('categories')
export class CategoryController {
  constructor(
    private command: CategoryCommandService,
    private query: CategoryQueryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.query.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.query.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: Category) {
    return this.command.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() body: Category) {
    return this.command.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.command.delete(id);
  }
}
