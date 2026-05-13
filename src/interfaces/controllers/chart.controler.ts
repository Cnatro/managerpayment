/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChartsQueryService } from '../../core/services/query/charts.query.service';
import { JwtAuthGuard } from '../../core/services/auth/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Get('processing')
  getProcessing(@CurrentUser() user: any) {
    return this.chartsService.getProcessMiniInSidebar(Number(user.id));
  }
}
