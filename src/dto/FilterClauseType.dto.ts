import { IsString } from 'class-validator';

export class FilterClauseType {
  @IsString()
  id: string;
  @IsString()
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  @IsString()
  value: string | number;
}
