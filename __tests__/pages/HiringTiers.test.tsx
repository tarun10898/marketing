import { fireEvent, render, screen } from '@testing-library/react';
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

  it('keeps Tier-1 companies hidden until Tier-1 is opened', async () => {
    render(<HiringTiersPage />);
    const tier1Btn = screen.getAllByRole('button').find(
      (b) => /Tier.1/i.test(b.textContent ?? '')
    )!;

    // Tier accordions are collapsed by default
    expect(screen.queryByRole('button', { name: /Razorpay/i })).not.toBeInTheDocument();

    fireEvent.click(tier1Btn);

    // Tier-1 companies appear after opening
    expect(screen.getAllByRole('button', { name: /Razorpay/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Google/i }).length).toBeGreaterThan(0);
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

  it('expands a company card to show detailed interview information', async () => {
    render(<HiringTiersPage />);

    const tier1Btn = screen.getAllByRole('button').find(
      (b) => /Tier.1/i.test(b.textContent ?? '')
    )!;
    fireEvent.click(tier1Btn);

    const razorpayButton = screen.getAllByText('Razorpay')[0].closest('button');
    expect(razorpayButton).not.toBeNull();

    fireEvent.click(razorpayButton!);

    expect(screen.getByText('No negative marking')).toBeInTheDocument();
    expect(screen.getByText('Rounds')).toBeInTheDocument();
    expect(screen.getByText('Exam Pattern')).toBeInTheDocument();
    expect(screen.getByText('Interviews')).toBeInTheDocument();
  });

  it('matches designation shorthands in search and can clear the search query', async () => {
    const user = userEvent.setup();
    render(<HiringTiersPage />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'sde2');

    expect(screen.getAllByText(/SDE 2/i).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(searchInput).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('renders breadcrumb back to Product Strategy', () => {
    render(<HiringTiersPage />);
    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });
});
