import { api } from '@/lib/api.ts';
import { useMutation, useQueryClient } from 'react-query';
import { FIND_ALL_TRANSACTIONS_QUERY_KEY } from '@/hooks/use-get-transactions.hook.ts';
import { Operation } from '@/shared/enums/operation.enum.ts';

interface UpdateTransactionDto {
  id: number;
  amount?: number;
  operation?: Operation;
  disabled?: boolean;
}

const updateTransaction = async (id: number, dto: UpdateTransactionDto) => {
  console.log({ id, dto });
  const { data } = await api.patch(`transactions/${id}`, dto);

  return data?.data;
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (dto: UpdateTransactionDto) => updateTransaction(dto.id, dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FIND_ALL_TRANSACTIONS_QUERY_KEY);
      },
    },
  );
};
