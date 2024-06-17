import { Column } from 'typeorm';
import { Source } from '../entities/income.entity';

export class CreateIncomeDto {
  @Column('date', {})
  date: Date;

  @Column('int', { default: 0 })
  sum: number;

  @Column('enum', {
    enum: Source,
    default: Source.INCOME,
  })
  source: Source;

  @Column('text', { nullable: true })
  description: string;
}
