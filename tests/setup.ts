import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch';
import matchers from '@testing-library/jest-dom/matchers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// setup mock server
export const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
