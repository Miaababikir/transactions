import { Controller, Get } from '@nestjs/common';

@Controller()
export class TransactionController {
  constructor() {}

  @Get()
  findTransactions(): string {
    return 'Up and running';
  }
}
