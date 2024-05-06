import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import TransactionsForm from '@/pages/transactions/components/transactions-form.tsx';
import { useGetTransactions } from '@/hooks/use-get-transactions.hook.ts';
import { Button } from '@/components/ui/button.tsx';
import { useCreateEmptyTransaction } from '@/hooks/use-create-empty-transaction.hook.ts';
import TransactionsResult from '@/pages/transactions/components/transactions-result.tsx';
import { Plus } from 'lucide-react';

const Transactions = () => {
  const { data } = useGetTransactions();

  const { mutate: createEmptyTransaction } = useCreateEmptyTransaction();

  const addTransaction = () => {
    createEmptyTransaction();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-indigo-600 text-zinc-950'>
      <Card className='w-2/3'>
        <CardHeader>
          <CardTitle className='text-xl'>Transactions</CardTitle>
          <CardDescription>
            From here you can create new transaction or update them or disable
            them from the calculation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-end'>
            <Button onClick={addTransaction}>
              <Plus size='15' />
              <span className='ml-1'>Add</span>
            </Button>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='h-96 overflow-y-scroll mt-4'>
              {data.length === 0 && (
                <p className='text-center'>No data available</p>
              )}

              <TransactionsForm transactions={data} />
            </div>
            <TransactionsResult transactions={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
