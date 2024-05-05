import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entitiy';
import { Repository } from 'typeorm';
import { Operation } from '../../shared/enums/operation.enum';
import { UpdateTransactionRequest } from '../controllers/dto/request/update-transaction.request';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  findAll() {
    return this.transactionRepository.find();
  }

  async createEmptyTransaction() {
    const transaction = this.transactionRepository.create();

    transaction.amount = 0;
    transaction.operation = Operation.PLUS;

    return await this.transactionRepository.save(transaction);
  }

  async deleteById(id: number) {
    await this.transactionRepository.delete({ id });
  }

  async updateById(id: number, dto: UpdateTransactionRequest) {
    const transaction = await this.transactionRepository.findOneBy({ id });

    if (!transaction) {
      return;
    }

    if (dto.amount) {
      transaction.amount = dto.amount;
    }

    if (dto.operation) {
      transaction.operation = dto.operation;
    }

    if (dto.disabled !== undefined) {
      transaction.disabled = dto.disabled;
    }

    await this.transactionRepository.save(transaction);
  }
}
