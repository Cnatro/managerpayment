import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DeductionFilter {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size?: number = 10;
}
