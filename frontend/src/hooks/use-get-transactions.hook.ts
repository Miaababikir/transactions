import { api } from '@/lib/api.ts';
import { useQuery } from 'react-query';

export const FIND_ALL_TRANSACTIONS_QUERY_KEY = 'transactions';

const findAllTransactions = async () => {
  const { data } = await api.get('transactions');
  return data?.data;
};

export const useGetTransactions = () => {
  return useQuery(
    FIND_ALL_TRANSACTIONS_QUERY_KEY,
    () => findAllTransactions(),
    {
      initialData: [],
    },
  );
};
