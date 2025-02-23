import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from '../src/App';
import { mockMortgageProdut } from '../src/mock_data';

const server = setupServer(
  http.get('https://nesto-fe-exam.vercel.app/api/products', (info) => {
    return HttpResponse.json(mockMortgageProdut);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('mortgage-products')).toBeInTheDocument();
  });
});
