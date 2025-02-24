import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from '../src/App';

describe('Home', () => {
  test('should render without crashing', async () => {
    render(<App />);

    // await waitFor(() => {
    //   expect(screen.getByTestId('mortgage-products')).toBeInTheDocument();
    // });

    const mortgageProducts = await screen.findByText('Fixed Mortgages');
    expect(mortgageProducts).toBeInTheDocument();
  });
});
