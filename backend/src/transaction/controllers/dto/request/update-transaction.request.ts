import { Operation } from '../../../../shared/enums/operation.enum';

export class UpdateTransactionRequest {
  amount?: number;
  operation?: Operation;
  disabled?: boolean;
}
