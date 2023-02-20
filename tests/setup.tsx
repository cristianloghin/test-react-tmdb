import { expect, afterEach, vitest } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from './mocks/server';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => server.listen());
beforeEach(() => {
  const mockIO = vitest.fn();
  mockIO.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIO;
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

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

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export { server, rest };
