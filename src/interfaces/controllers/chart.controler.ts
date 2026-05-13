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
  getWeekly(@CurrentUser() user: any) {
    return this.chartsService.getWeeklyChart(Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('monthly')
  getMonthly(@CurrentUser() user: any) {
    return this.chartsService.getMonthlyChart(Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('categories')
  getCategories(@CurrentUser() user: any) {
    return this.chartsService.getCategoryChart(Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboard(@CurrentUser() user: any) {
    return this.chartsService.getDashboardData(Number(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('processing')
  getProcessing(@CurrentUser() user: any) {
    return this.chartsService.getProcessMiniInSidebar(Number(user.id));
  }
}
