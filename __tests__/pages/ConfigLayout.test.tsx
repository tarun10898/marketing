import { render, screen } from '@testing-library/react';
import ConfigLayoutPage from '@/app/config-layout/page';
import { layoutTheme } from '@/app/config-layout/theme';

describe('Config layout page', () => {
  it('renders the central theme configuration preview', () => {
    render(<ConfigLayoutPage />);

    expect(
      screen.getByRole('heading', { name: 'Config Layout' })
    ).toBeInTheDocument();
    expect(screen.getByText('Single source of truth')).toBeInTheDocument();
    expect(screen.getByText(layoutTheme.colors.primary)).toBeInTheDocument();
    expect(screen.getByText(layoutTheme.colors.secondary)).toBeInTheDocument();
    expect(screen.getAllByText(/app\/config-layout\/theme\.ts/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('link', { name: /go to strategy overview/i })
    ).toHaveAttribute('href', '/product-strategy');
  });
});