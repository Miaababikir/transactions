import { ThemeProvider } from '@/components/theme-provider.tsx';
import Transactions from '@/pages/transactions/transactions.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Transactions />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
