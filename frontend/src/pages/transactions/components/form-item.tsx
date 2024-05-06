import { useDeleteTransaction } from '@/hooks/use-delete-transaction.hook.ts';
import { useUpdateTransaction } from '@/hooks/use-update-transaction.hook.ts';
import { Operation } from '@/shared/enums/operation.enum.ts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';
import { Transaction } from '@/pages/transactions/components/transactions-form.tsx';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form.tsx';
import { useEffect } from 'react';
import _debounce from 'lodash/debounce';
import Loading from '@/pages/transactions/components/loading.tsx';

interface Props {
  transaction: Transaction;
}

const FormItem = ({ transaction }: Props) => {
  const form = useForm<Transaction>({ defaultValues: transaction });

  const { mutate: deleteTransaction } = useDeleteTransaction();
  const { mutate: updateTransaction, isLoading } = useUpdateTransaction();

  const handleFormChange = _debounce((data: Transaction) => {
    updateTransaction(data);
  }, 500);

  const onDeleteTransaction = (id: number) => {
    deleteTransaction(id);
  };

  useEffect(() => {
    const subscription = form.watch(() =>
      form.handleSubmit(handleFormChange)(),
    );

    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='grid grid-cols-5 gap-2 mt-4'>
      <Form {...form}>
        <Controller
          control={form.control}
          name='operation'
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder='Operation' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={Operation.PLUS}>+</SelectItem>
                  <SelectItem value={Operation.MINUS}>-</SelectItem>
                  <SelectItem value={Operation.MULTIPLY}>*</SelectItem>
                  <SelectItem value={Operation.DIVIDE}>/</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Input
          {...form.register('amount', {
            valueAsNumber: true,
          })}
          className='col-span-3'
          placeholder='Amount'
          type='number'
        />

        <div className='flex justify-between'>
          <FormField
            control={form.control}
            name='disabled'
            render={({ field }) => (
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id={`disabled.${transaction.id}`}
                  onCheckedChange={field.onChange}
                  defaultValue={+transaction.disabled}
                  checked={field.value}
                />
                <label
                  htmlFor={`disabled.${transaction.id}`}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Disable
                </label>
              </div>
            )}
          />

          <Button
            className='ml-4'
            size='icon'
            variant='secondary'
            onClick={() => onDeleteTransaction(transaction.id)}
          >
            <Trash height={15} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormItem;
