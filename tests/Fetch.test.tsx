import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest, renderWithClient } from './setup';
import Fetch from '@/Fetch';

test('loads and displays greeting', async () => {
  const user = userEvent.setup();
  renderWithClient(<Fetch url='/greeting' />);

  await user.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toBeDisabled();
});

test('handles server error', async () => {
  const user = userEvent.setup();
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithClient(<Fetch url='/greeting' />);

  await user.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('alert'));

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toBeDisabled();
});
