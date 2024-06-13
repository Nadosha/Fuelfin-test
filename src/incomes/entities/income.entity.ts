import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Source {
  INCOME = 'income',
  OTHER = 'other',
  CUSTOM = 'custom-source',
}
@Entity({ name: 'incomes' })
export class IncomeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  date: Date;

  @Column()
  sum: number;

  @Column({
    type: 'enum',
    enum: Source,
    default: Source.INCOME,
  })
  source: Source;

  @Column({ nullable: true })
  description: string;
}
