import { api } from '@/lib/api.ts';
import { useMutation, useQueryClient } from 'react-query';
import { FIND_ALL_TRANSACTIONS_QUERY_KEY } from '@/hooks/use-get-transactions.hook.ts';

const createEmptyTransaction = async () => {
  const { data } = await api.post('transactions');

  return data?.data;
};

export const useCreateEmptyTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(createEmptyTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(FIND_ALL_TRANSACTIONS_QUERY_KEY);
    },
  });
};
