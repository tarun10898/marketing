import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigLayoutPage from '@/app/config-layout/page';
import ProductStrategyPage from '@/app/product-strategy/page';
import ResourcesPage from '@/app/product-strategy/resources/page';
import HiringTiersPage from '@/app/product-strategy/hiring-tiers/page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Strategy pages integration', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders the dashboard with the real shared header and footer', () => {
    render(<ProductStrategyPage />);

    expect(
      screen.getByRole('link', { name: /easyloops internal/i })
    ).toHaveAttribute('href', '/product-strategy');
    expect(screen.getByRole('button', { name: 'Toggle dark mode' })).toBeInTheDocument();
    expect(screen.getByText(/Internal strategy document/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Competitor Scan/i })[0]).toHaveAttribute(
      'href',
      '/product-strategy/competitor-scan'
    );
  });

  it('renders resources page with shared breadcrumb, nav, footer, and dark-mode header interaction', async () => {
    const user = userEvent.setup();
    render(<ResourcesPage />);

    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← Position · Promotion · Price' })).toHaveAttribute(
      'href',
      '/product-strategy/positioning'
    );
    expect(screen.getByRole('link', { name: 'Feedback Links →' })).toHaveAttribute(
      'href',
      '/product-strategy/feedback'
    );

    const darkModeButton = screen.getByRole('button', { name: 'Toggle dark mode' });
    await user.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('integrates the config layout page with shared header behavior and themed route links', async () => {
    const user = userEvent.setup();
    render(<ConfigLayoutPage />);

    expect(screen.getByRole('heading', { name: 'Config Layout' })).toBeInTheDocument();
    expect(screen.getByText('Single source of truth')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to strategy overview' })
    ).toHaveAttribute('href', '/product-strategy');
    expect(
      screen.getByRole('link', { name: /Competitor Scan/i })
    ).toHaveAttribute('href', '/product-strategy/competitor-scan');

    const darkModeButton = screen.getByRole('button', { name: 'Toggle dark mode' });
    await user.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('integrates the hiring tiers page shell with search and accordion interactions', async () => {
    const user = userEvent.setup();
    render(<HiringTiersPage />);

    expect(screen.getByRole('heading', { name: 'Company Hiring Tiers' })).toBeInTheDocument();
    expect(screen.getByText('Course Reference')).toBeInTheDocument();
    expect(screen.getByText(/Internal course reference document/i)).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'sde2' } });
    expect((await screen.findAllByText(/SDE 2/i)).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(searchInput).toHaveValue('');

    const tier1Button = screen.getAllByRole('button').find(
      (button) => /Tier.1/i.test(button.textContent ?? '')
    );
    expect(tier1Button).toBeDefined();

    await user.click(tier1Button!);
    const razorpayButton = (await screen.findAllByText('Razorpay'))[0].closest('button');
    expect(razorpayButton).not.toBeNull();

    await user.click(razorpayButton!);
    expect(screen.getByText('No negative marking')).toBeInTheDocument();
    expect(screen.getByText('Exam Pattern')).toBeInTheDocument();
  });
});