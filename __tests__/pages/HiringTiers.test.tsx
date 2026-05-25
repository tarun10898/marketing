import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HiringTiersPage from '@/app/product-strategy/hiring-tiers/page';

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

describe('HiringTiersPage', () => {
  it('renders the page heading', () => {
    render(<HiringTiersPage />);
    expect(screen.getByRole('heading', { name: /Company Hiring Tiers/i })).toBeInTheDocument();
  });

  it('renders accordion buttons for all three tiers', () => {
    render(<HiringTiersPage />);
    // Each tier renders a button containing its label
    const buttons = screen.getAllByRole('button');
    const labels = buttons.map((b) => b.textContent ?? '');
    expect(labels.some((t) => /Tier.1/i.test(t))).toBe(true);
    expect(labels.some((t) => /Tier.2/i.test(t))).toBe(true);
    expect(labels.some((t) => /Tier.3/i.test(t))).toBe(true);
  });

  it('shows Tier-1 companies by default (Tier-1 accordion is open)', () => {
    render(<HiringTiersPage />);
    // Tier-1 is open by default; these companies are in Tier-1
    expect(screen.getAllByText(/TCS/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Razorpay/).length).toBeGreaterThan(0);
  });

  it('Tier-2 companies are hidden until accordion is opened', async () => {
    const user = userEvent.setup();
    render(<HiringTiersPage />);

    // Tier-2 accordion header button contains "Tier‑2"
    const tier2Btn = screen.getAllByRole('button').find(
      (b) => /Tier.2/i.test(b.textContent ?? '')
    )!;

    // Before opening, Tier-2 content is not in DOM
    expect(screen.queryAllByText('Capgemini').length).toBe(0);

    await user.click(tier2Btn);

    // After opening, Tier-2 companies appear
    expect(screen.getAllByText(/Capgemini/).length).toBeGreaterThan(0);
  });

  it('search input filters companies across tiers', async () => {
    const user = userEvent.setup();
    render(<HiringTiersPage />);
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Google');
    expect(screen.getAllByText(/Google/).length).toBeGreaterThan(0);
  });

  it('renders breadcrumb back to Product Strategy', () => {
    render(<HiringTiersPage />);
    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });
});
