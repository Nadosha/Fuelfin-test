import { DataSource } from 'typeorm';
import { IncomeEntity } from './entities/income.entity';

export const incomesProviders = [
  {
    provide: 'INCOME_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      dataSource.getRepository(IncomeEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
