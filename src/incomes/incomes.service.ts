import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeEntity } from './entities/income.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'date-fns';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
  ) {}

  async create(incomes: CreateIncomeDto[]) {
    const incomesData: CreateIncomeDto[] = [];
    for (const row of incomes) {
      const income = new IncomeEntity();
      income.date = parse(
        row.date as unknown as string,
        'dd-MM-yyyy',
        new Date(),
      );
      income.sum = parseFloat(row.sum as unknown as string);
      income.source = row.source;
      income.description = row.description;

      incomesData.push(income);
    }
    if (incomesData.length) {
      try {
        return await this.incomeRepository
          .createQueryBuilder()
          .insert()
          .into(IncomeEntity)
          .values(incomesData)
          .orIgnore()
          .execute();
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  }

  async generateReport(filters?: { source?: string; date?: string }) {
    const query = this.incomeRepository.createQueryBuilder('income');

    if (filters?.source) {
      query.andWhere('income.source = :source', { source: filters.source });
    }

    if (filters?.date) {
      const [month, year] = filters.date.split('-');
      query.andWhere(
        'MONTH(income.date) = :month AND YEAR(income.date) = :year',
        {
          month,
          year,
        },
      );
    }

    const results = await query.orderBy('income.date', 'ASC').getMany();

    const report = results.reduce((acc, income) => {
      const date = new Date(income.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      let sourceData = acc.find((data) => data.source === income.source);

      if (!sourceData) {
        sourceData = { source: income.source, data: [] };
        acc.push(sourceData);
      }

      let dateData = sourceData.data.find((data) => data.date === monthYear);

      if (!dateData) {
        dateData = { date: monthYear, total: 0 };
        sourceData.data.push(dateData);
      }

      dateData.total += income.sum;

      return acc;
    }, []);

    return report;
  }

  async findAll() {
    return await this.incomeRepository.find();
  }
}
