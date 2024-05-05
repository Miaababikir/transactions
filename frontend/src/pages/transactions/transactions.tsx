import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import TransactionsForm from '@/pages/transactions/components/transactions-form.tsx';
import { useGetTransactions } from '@/hooks/use-get-transactions.hook.ts';
import { Button } from '@/components/ui/button.tsx';
import { useCreateEmptyTransaction } from '@/hooks/use-create-empty-transaction.hook.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Transactions = () => {
  const { data, isFetching } = useGetTransactions();

  const { mutate: createEmptyTransaction } = useCreateEmptyTransaction();

  const addTransaction = () => {
    createEmptyTransaction();
    // append({
    //   amount: 0,
    //   operation: Operation.PLUS,
    //   disabled: false,
    // });
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='w-2/3'>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-end'>
            <Button onClick={addTransaction}>Add</Button>
          </div>
          <div className='h-96 overflow-y-scroll mt-4'>
            {data.length === 0 && (
              <p className='text-center'>No data available</p>
            )}

            <TransactionsForm transactions={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
