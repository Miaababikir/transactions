import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entitiy';
import { Repository } from 'typeorm';
import { TransactionResult } from '../entities/transaction-result.entitiy';
import { Operation } from '../../shared/enums/operation.enum';

@Injectable()
export class TransactionResultService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionResult)
    private transactionResultRepository: Repository<TransactionResult>,
  ) {}

  async calculateResult() {
    const transactions = await this.transactionRepository.find();

    const total = transactions.reduce((total, transaction, index) => {
      if (transaction.disabled) {
        return total;
      }

      if (
        index === 0 &&
        (transaction.operation === Operation.MULTIPLY ||
          transaction.operation === Operation.DIVIDE)
      ) {
        return transaction.amount;
      }

      if (transaction.operation === Operation.PLUS) {
        return total + transaction.amount;
      }

      if (transaction.operation === Operation.MINUS) {
        return total - transaction.amount;
      }

      if (transaction.operation === Operation.MULTIPLY) {
        return total * transaction.amount;
      }

      if (transaction.operation === Operation.DIVIDE) {
        if (transaction.amount === 0) {
          return 0;
        }

        return total / transaction.amount;
      }

      return total;
    }, 0);

    let transactionResult = await this.transactionResultRepository.findOneBy(
      {},
    );

    if (!transactionResult) {
      transactionResult = this.transactionResultRepository.create();
    }

    transactionResult.total = total;

    await this.transactionResultRepository.save(transactionResult);
  }
}
