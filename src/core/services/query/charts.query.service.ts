/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import type { ExpenseRepository } from '../../repositories/expenses.repository';
import type { IncomeRepository } from '../../repositories/income.repository';
import type { SavingRepository } from '../../repositories/saving.repository';
import type { DeductionRepository } from '../../repositories/deductions.repository';
import { ChartFilter } from '../dto/filters/chartFilter';
import type { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class ChartsQueryService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expenseRepo: ExpenseRepository,

    @Inject('IncomeRepository')
    private readonly incomeRepo: IncomeRepository,

    @Inject('SavingRepository')
    private readonly savingRepo: SavingRepository,

    @Inject('DeductionRepository')
    private readonly deductionRepo: DeductionRepository,

    @Inject('CategoryRepository')
    private readonly categoryRepo: CategoryRepository,
  ) {}

  // ================= DASHBOARD =================
  async getDashboardData(userId: number) {
    const [expenses, incomes, savings, deductions] = await Promise.all([
      this.expenseRepo.findAll(userId),
      this.incomeRepo.findAll(userId),
      this.savingRepo.findAll(userId),
      this.deductionRepo.findAll(userId),
    ]);

    const categoryIds = expenses.map((expense) => expense.categoryId);
    const categories = await this.categoryRepo.findAllInIds([
      ...new Set(categoryIds),
    ]);

    const categoryMap = new Map(
      categories.map((category) => [category.id, category.name]),
    );

    const totalIncome = this.sum(incomes, 'amount');
    const totalExpenses = this.sum(expenses, 'amount');
    const totalSavings = this.sum(savings, 'amount');
    const totalDeductions = this.sum(deductions, 'amount');

    return {
      totalIncome,
      totalExpenses,
      totalSavings,
      totalDeductions,

      remainingBalance:
        totalIncome - totalExpenses - totalSavings - totalDeductions,

      recentExpenses: expenses.slice(-5).map((expense) => ({
        ...expense,
        categoryName: categoryMap.get(expense.categoryId) || 'Không xác định',
      })),

      savingsSummary: savings.map((s) => ({
        type: s.type,
        amount: s.amount,
        note: s.note,
      })),
    };
  }

  // ================= WEEKLY CHART =================
  async getWeeklyChart(userId: number) {
    const expenses = await this.expenseRepo.findAll(userId);

    const grouped = new Map<number, number>();

    for (const e of expenses) {
      const week = Number(e.week);
      grouped.set(week, (grouped.get(week) || 0) + Number(e.amount || 0));
    }

    const result = Array.from(grouped.entries())
      .map(([week, amount]) => ({
        week,
        label: `Tuần ${week}`,
        amount,
      }))
      .sort((a, b) => a.week - b.week);

    return this.addTrend(result);
  }

  // ================= PERIOD CHART =================
  async getChartByPeriod(filter: ChartFilter, userId: number) {
    const expenses = await this.expenseRepo.findAll(userId);

    const grouped = new Map<number, number>();

    for (const e of expenses) {
      const date = new Date(e.date);

      let key: number;
      let label: string;

      switch (filter.period) {
        case 'day':
          key = date.getDate();
          label = `Ngày ${key}`;
          break;

        case 'week':
          key = Number(e.week);
          label = `Tuần ${key}`;
          break;

        case 'month':
          key = date.getMonth() + 1;
          label = `T${key}`;
          break;

        case 'year':
          key = date.getFullYear();
          label = `${key}`;
          break;

        default:
          key = date.getMonth() + 1;
          label = `T${key}`;
      }

      grouped.set(key, (grouped.get(key) || 0) + Number(e.amount || 0));
    }

    const result = Array.from(grouped.entries())
      .map(([key, amount]) => ({
        value: key,
        label:
          filter.period === 'day'
            ? `Ngày ${key}`
            : filter.period === 'week'
              ? `Tuần ${key}`
              : filter.period === 'month'
                ? `T${key}`
                : `${key}`,
        amount,
      }))
      .sort((a, b) => a.value - b.value);

    return this.addTrend(result);
  }

  // ================= CATEGORY CHART =================
  async getCategoryChart(userId: number) {
    const expenses = await this.expenseRepo.findAll(userId);

    const grouped = new Map<number, number>();

    for (const e of expenses) {
      const catId = Number(e.categoryId);
      grouped.set(catId, (grouped.get(catId) || 0) + Number(e.amount || 0));
    }

    return Array.from(grouped.entries()).map(([categoryId, amount]) => ({
      categoryId,
      amount,
    }));
  }

  async getProcessMiniInSidebar(userId: number) {
    return await this.incomeRepo.getProcessMiniInSidebar(userId);
  }

  // ================= HELPERS =================
  private sum(list: any[], field: string) {
    return list.reduce((s, item) => s + Number(item[field] || 0), 0);
  }

  private addTrend(data: any[]) {
    return data.map((item, index) => {
      const prev = data[index - 1];

      let change = 0;
      let percent = 0;
      let trend: 'up' | 'down' | 'neutral' = 'neutral';

      if (prev && prev.amount) {
        change = item.amount - prev.amount;
        percent = Number(((change / prev.amount) * 100).toFixed(1));
        trend = change >= 0 ? 'up' : 'down';
      }

      return {
        ...item,
        change,
        percent,
        trend,
        formatted: `${item.amount.toLocaleString('vi-VN')} đ`,
      };
    });
  }
}
