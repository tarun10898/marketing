import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HiringTiersPageContent } from '@/app/product-strategy/hiring-tiers/page';

const mockTiers = [
  {
    id: 'tier1',
    label: 'Tier‑1',
    range: '≥ ₹10 LPA',
    accent: 'emerald',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    companies: [
      {
        name: 'Razorpay',
        role: 'Software Engineer (Fresher)',
        ctc: '₹15–25+ LPA',
        negativeMarking: false,
        rounds: 'Online assessment → Technical rounds → HR',
        pattern: ['DSA screening', 'Technical interviews'],
        interviews: 'DSA + CS fundamentals',
        eligibility: '60%+ and no active backlogs',
      },
      {
        name: 'Google',
        role: 'SDE 2 / SDE III',
        ctc: '₹35–55+ LPA',
        negativeMarking: false,
        rounds: 'Online assessment → Interview loop',
        pattern: ['Algorithms', 'Googleyness'],
        interviews: 'Algorithms + systems',
        eligibility: 'Top-tier academics preferred',
      },
    ],
  },
  {
    id: 'tier2',
    label: 'Tier‑2',
    range: '₹4.5–10 LPA',
    accent: 'blue',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-200',
    companies: [
      {
        name: 'Capgemini',
        role: 'Analyst / Engineer',
        ctc: '₹4.5–7.5 LPA',
        negativeMarking: false,
        rounds: 'Assessment → Interview',
        pattern: ['Aptitude', 'Coding'],
        interviews: 'Projects + communication',
        eligibility: '60%+ throughout',
      },
    ],
  },
  {
    id: 'tier3',
    label: 'Tier‑3',
    range: '≤ ₹4.5 LPA',
    accent: 'slate',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    borderColor: 'border-slate-200',
    companies: [
      {
        name: 'SupportCo',
        role: 'SDE 2 (Experienced Hire)',
        ctc: '₹4 LPA',
        negativeMarking: false,
        rounds: 'Assessment → Interview',
        pattern: ['Basics'],
        interviews: 'Core CS',
        eligibility: 'Open eligibility',
      },
    ],
  },
] as const;

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

function renderPage() {
  render(<HiringTiersPageContent initialTiers={mockTiers as never} />);
}

describe('HiringTiersPage', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Company Hiring Tiers/i })).toBeInTheDocument();
  });

  it('renders accordion buttons for all three tiers', () => {
    renderPage();
    // Each tier renders a button containing its label
    const buttons = screen.getAllByRole('button');
    const labels = buttons.map((b) => b.textContent ?? '');
    expect(labels.some((t) => /Tier.1/i.test(t))).toBe(true);
    expect(labels.some((t) => /Tier.2/i.test(t))).toBe(true);
    expect(labels.some((t) => /Tier.3/i.test(t))).toBe(true);
  });

  it('keeps Tier-1 companies hidden until Tier-1 is opened', async () => {
    const user = userEvent.setup();
    renderPage();
    const tier1Btn = screen.getAllByRole('button').find(
      (b) => /Tier.1/i.test(b.textContent ?? '')
    )!;

    // Tier accordions are collapsed by default
    expect(screen.queryByRole('button', { name: /Razorpay/i })).not.toBeInTheDocument();

    await user.click(tier1Btn);

    // Tier-1 companies appear after opening
    expect((await screen.findAllByRole('button', { name: /Razorpay/i })).length).toBeGreaterThan(0);
    expect((await screen.findAllByRole('button', { name: /Google/i })).length).toBeGreaterThan(0);
  }, 10000);

  it('Tier-2 companies are hidden until accordion is opened', async () => {
    const user = userEvent.setup();
    renderPage();

    // Tier-2 accordion header button contains "Tier‑2"
    const tier2Btn = screen.getAllByRole('button').find(
      (b) => /Tier.2/i.test(b.textContent ?? '')
    )!;

    // Before opening, Tier-2 content is not in DOM
    expect(screen.queryAllByText('Capgemini').length).toBe(0);

    await user.click(tier2Btn);

    // After opening, Tier-2 companies appear
    expect((await screen.findAllByText(/Capgemini/)).length).toBeGreaterThan(0);
  });

  it('search input filters companies across tiers', async () => {
    const user = userEvent.setup();
    renderPage();
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Google');
    expect((await screen.findAllByText(/Google/)).length).toBeGreaterThan(0);
  });

  it('expands a company card to show detailed interview information', async () => {
    const user = userEvent.setup();
    renderPage();

    const tier1Btn = screen.getAllByRole('button').find(
      (b) => /Tier.1/i.test(b.textContent ?? '')
    )!;
    await user.click(tier1Btn);

    const razorpayButton = (await screen.findAllByText('Razorpay'))[0].closest('button');
    expect(razorpayButton).not.toBeNull();

    await user.click(razorpayButton!);

    expect(screen.getByText('No negative marking')).toBeInTheDocument();
    expect(screen.getByText('Rounds')).toBeInTheDocument();
    expect(screen.getByText('Exam Pattern')).toBeInTheDocument();
    expect(screen.getByText('Interviews')).toBeInTheDocument();
  });

  it('matches designation shorthands in search and can clear the search query', async () => {
    const user = userEvent.setup();
    renderPage();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'sde2');

    expect((await screen.findAllByText(/SDE 2/i)).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(searchInput).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('renders breadcrumb back to Product Strategy', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });
});
