import { render, screen } from '@testing-library/react';
import ProductStrategyPage from '@/app/product-strategy/page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/shared/components', () => ({
  SimpleHeader: () => <header data-testid="simple-header" />,
  Sidebar: () => <aside data-testid="sidebar" />,
}));

describe('ProductStrategyPage (dashboard)', () => {
  it('renders the page heading', () => {
    render(<ProductStrategyPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders all 6 strategy stage cards', () => {
    render(<ProductStrategyPage />);
    expect(screen.getByText('Competitor Scan')).toBeInTheDocument();
    expect(screen.getByText('Position · Promotion · Price')).toBeInTheDocument();
    expect(screen.getByText('Customer Engagement & KPIs')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Feedback Links')).toBeInTheDocument();
    expect(screen.getByText('Popular Companies Students and Experienced Ones Know')).toBeInTheDocument();
  });

  it('stage cards link to correct routes', () => {
    render(<ProductStrategyPage />);
    expect(
      screen.getByRole('link', { name: /Competitor Scan/i })
    ).toHaveAttribute('href', '/product-strategy/competitor-scan');

    expect(
      screen.getByRole('link', { name: /Feedback Links/i })
    ).toHaveAttribute('href', '/product-strategy/feedback');

    expect(
      screen.getByRole('link', { name: /Popular Companies Students and Experienced Ones Know/i })
    ).toHaveAttribute('href', '/product-strategy/hiring-tiers');
  });

  it('renders audience segments', () => {
    render(<ProductStrategyPage />);
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Professionals')).toBeInTheDocument();
    expect(screen.getByText('Lifelong Learners')).toBeInTheDocument();
  });

  it('renders the SimpleHeader', () => {
    render(<ProductStrategyPage />);
    expect(screen.getByTestId('simple-header')).toBeInTheDocument();
  });
});
