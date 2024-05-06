import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entitiy';
import { TransactionResult } from './entities/transaction-result.entitiy';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TransactionResultService } from './services/transaction-result.service';
import { TransactionSavedListener } from './listeners/transaction-saved.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionResult]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionResultService,
    TransactionSavedListener,
  ],
})
export class TransactionModule {}
