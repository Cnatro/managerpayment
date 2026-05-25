import { IsEnum } from 'class-validator';

export enum ChartPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export class ChartFilter {
  @IsEnum(ChartPeriod, {
    message: 'period must be day, week, month, or year',
  })
  period?: ChartPeriod;
}
