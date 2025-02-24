import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { mockMortgageProduct } from './src/mock_data';

export const restHandlers = [
  http.get('https://nesto-fe-exam.vercel.app/api/products', () => {
    return HttpResponse.json([mockMortgageProduct]);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
