import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { ApiResponse } from '../../shared/response/api.response';
import { UpdateTransactionRequest } from './dto/request/update-transaction.request';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async findAll() {
    const transactions = await this.transactionService.findAll();

    return new ApiResponse(transactions);
  }

  @Post()
  async createEmptyTransaction() {
    const transaction = await this.transactionService.createEmptyTransaction();
    return new ApiResponse(transaction, 'Successfully created');
  }

  @Patch(':id')
  async updateTransaction(
    @Param('id') id: number,
    @Body() dto: UpdateTransactionRequest,
  ) {
    await this.transactionService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    await this.transactionService.deleteById(id);
    return new ApiResponse(null, 'Successfully deleted');
  }
}
