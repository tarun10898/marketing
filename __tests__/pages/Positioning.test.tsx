import { render, screen } from '@testing-library/react';
import PositioningPage from '@/app/product-strategy/positioning/page';

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

describe('PositioningPage', () => {
  it('renders heading and value proposition section', () => {
    render(<PositioningPage />);

    expect(screen.getByRole('heading', { name: 'Position · Promotion · Price' })).toBeInTheDocument();
    expect(screen.getByText('Unique Value Proposition')).toBeInTheDocument();
    expect(screen.getByText(/Learn anywhere, in your language/i)).toBeInTheDocument();
  });

  it('renders promotion and pricing content', () => {
    render(<PositioningPage />);

    expect(screen.getByRole('heading', { name: 'Promotion Plan' })).toBeInTheDocument();
    expect(screen.getByText('Pre-launch buzz')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Pricing Strategy' })).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('renders engagement KPIs and next/previous navigation links', () => {
    render(<PositioningPage />);

    expect(screen.getByRole('heading', { name: 'Customer Engagement' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Metrics & KPIs' })).toBeInTheDocument();
    expect(screen.getByText('Acquisition')).toBeInTheDocument();
    expect(screen.getByText('Retention')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '← Competitor Scan' })).toHaveAttribute(
      'href',
      '/product-strategy/competitor-scan'
    );
    expect(screen.getByRole('link', { name: 'Resources →' })).toHaveAttribute(
      'href',
      '/product-strategy/resources'
    );
  });
});
