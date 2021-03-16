import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {setupServer} from 'msw/node';
import handlers from './handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders initial screen', async () => {
  render(<App />);
  expect(screen.queryByText("☕☕☕☕☕")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(await screen.findByText("☕☕☕☕☕")).toBeInTheDocument();
});
