import { Transaction } from '@/pages/transactions/components/transactions-form.tsx';
import { useMemo } from 'react';
import { Operation } from '@/shared/enums/operation.enum.ts';

interface Props {
  transactions: Transaction[];
}

const TransactionsResult = ({ transactions }: Props) => {
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
    <div className='mt-4'>
      <p>Result: {totalResult}</p>
    </div>
  );
};

export default TransactionsResult;
