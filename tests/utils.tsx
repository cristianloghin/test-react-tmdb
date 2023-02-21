import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainReducer } from '@/store';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export default function (ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const store = configureStore({
    reducer: {
      main: mainReducer,
    },
  });
  const { rerender, ...result } = render(
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    </Provider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <Provider store={store}>
          <QueryClientProvider client={testQueryClient}>
            {rerenderUi}
          </QueryClientProvider>
        </Provider>
      ),
  };
}
