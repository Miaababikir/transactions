import { Operation } from '@/shared/enums/operation.enum.ts';
import { useMemo } from 'react';
import FormItem from '@/pages/transactions/components/form-item.tsx';

export interface Transaction {
  id?: number;
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
  const totalResult = useMemo(() => {
    return transactions.reduce((total, transaction, index) => {
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
  }, [transactions]);

  return (
    <>
      <div>
        {transactions.map((transaction) => (
          <FormItem transaction={transaction} key={transaction.id} />
        ))}
      </div>
      <div className='mt-4'>
        <p>Result: {totalResult}</p>
      </div>
    </>
  );
};

export default TransactionsForm;
