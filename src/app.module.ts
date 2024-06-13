import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { IncomesModule } from './incomes/incomes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, IncomesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
