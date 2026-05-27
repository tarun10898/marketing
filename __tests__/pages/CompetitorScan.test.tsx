import { render, screen } from '@testing-library/react';
import CompetitorScanPage from '@/app/product-strategy/competitor-scan/page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/shared/components', () => ({
  SimpleHeader: () => <header data-testid="simple-header" />,
}));

describe('CompetitorScanPage', () => {
  it('renders the page heading and breadcrumb', () => {
    render(<CompetitorScanPage />);

    expect(screen.getByRole('heading', { name: 'Competitor Scan' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });

  it('renders both competitor tables with representative entries', () => {
    render(<CompetitorScanPage />);

    expect(screen.getByRole('heading', { name: 'Global Competitors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Indian Competitors' })).toBeInTheDocument();

    expect(screen.getByText('Coursera')).toBeInTheDocument();
    expect(screen.getAllByText('Scaler').length).toBeGreaterThan(0);
  });

  it('renders content model glossary and stage navigation links', () => {
    render(<CompetitorScanPage />);

    expect(screen.getByText('Content Creation Model Glossary')).toBeInTheDocument();
    expect(screen.getByText(/independent instructors\) can create and sell/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '← Back to Strategy Overview' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
    expect(screen.getByRole('link', { name: 'Position · Promotion · Price →' })).toHaveAttribute(
      'href',
      '/product-strategy/positioning'
    );
  });
});
