import { Operation } from '@/shared/enums/operation.enum.ts';
import FormItem from '@/pages/transactions/components/form-item.tsx';

export interface Transaction {
  id: number;
  operation: Operation;
  amount: number;
  disabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Props {
  transactions: Transaction[];
}

const TransactionsForm = ({ transactions }: Props) => {
  return (
    <div>
      {transactions.map((transaction) => (
        <FormItem transaction={transaction} key={transaction.id} />
      ))}
    </div>
  );
};

export default TransactionsForm;
