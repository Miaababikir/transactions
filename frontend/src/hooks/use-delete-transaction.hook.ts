import { api } from '@/lib/api.ts';
import { useMutation, useQueryClient } from 'react-query';
import { FIND_ALL_TRANSACTIONS_QUERY_KEY } from '@/hooks/use-get-transactions.hook.ts';

const deleteTransaction = async (id: number) => {
  const { data } = await api.delete(`transactions/${id}`);

  return data?.data;
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteTransaction(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(FIND_ALL_TRANSACTIONS_QUERY_KEY);
    },
  });
};
