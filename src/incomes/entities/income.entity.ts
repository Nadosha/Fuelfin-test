import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum Source {
  INCOME = 'income',
  OTHER = 'other',
  CUSTOM = 'custom-source',
}

@Entity({ name: 'incomes' })
@Unique(['date', 'sum', 'source'])
export class IncomeEntity {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
