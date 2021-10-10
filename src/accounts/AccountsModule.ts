import { Module } from '@nestjs/common';
import { AccountsController } from './AccountsController';
import { AccountsService } from './AccountsService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/AccountEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
