import { OnEvent } from '@nestjs/event-emitter';
import { TransactionResultService } from '../services/transaction-result.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionSavedListener {
  constructor(private transactionResultService: TransactionResultService) {}

  @OnEvent('transaction.saved')
  async handleOrderCreatedEvent() {
    await this.transactionResultService.calculateResult();
  }
}
