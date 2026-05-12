import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChartsQueryService } from '../../core/services/query/charts.query.service';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';

@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsQueryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('weekly')
  getWeekly() {
    return this.chartsService.getWeeklyChart();
  }

  @UseGuards(JwtAuthGuard)
  @Get('monthly')
  getMonthly() {
    return this.chartsService.getMonthlyChart();
  }

  @UseGuards(JwtAuthGuard)
  @Get('categories')
  getCategories() {
    return this.chartsService.getCategoryChart();
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboard() {
    return this.chartsService.getDashboardData();
  }
}
