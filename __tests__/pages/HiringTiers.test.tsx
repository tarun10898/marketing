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
        role: 'SDE 2 (Fresher)',
        ctc: '₹15–25+ LPA',
        experience: 'Fresher',
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
        experience: 'Experienced (2–5 yrs)',
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
        experience: 'Fresher',
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
        experience: 'Experienced (3–5 yrs)',
        negativeMarking: false,
        rounds: 'Assessment → Interview',
        pattern: ['Basics'],
        interviews: 'Core CS',
        eligibility: 'Open eligibility',
      },
      {
        name: 'Wipro',
        role: 'Project Engineer (Fresher)',
        ctc: '₹3.5 LPA',
        experience: 'Fresher',
        negativeMarking: false,
        rounds: 'Assessment → Interview',
        pattern: ['Basics'],
        interviews: 'Core CS',
        eligibility: 'Open eligibility',
      },
      {
        name: 'TCS',
        role: 'Systems Engineer (Experienced)',
        ctc: '₹4.2 LPA',
        experience: 'Experienced (2–4 yrs)',
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

  it('renders top-level accordions for Freshers and Experienced', () => {
    renderPage();
    const buttons = screen.getAllByRole('button');
    const labels = buttons.map((b) => b.textContent ?? '');
    expect(labels.some((t) => /Freshers/i.test(t))).toBe(true);
    expect(labels.some((t) => /Experienced/i.test(t))).toBe(true);
  });

  it('keeps sub-accordions hidden until top-level is opened', async () => {
    const user = userEvent.setup();
    renderPage();

    // Sub-groups shouldn't be visible yet (only Legend elements exist, which aren't buttons)
    const buttonsBefore = screen.getAllByRole('button');
    const labelsBefore = buttonsBefore.map((b) => b.textContent ?? '');
    expect(labelsBefore.some((t) => /Tier.1/i.test(t))).toBe(false);

    const freshersBtn = buttonsBefore.find((b) => /Freshers/i.test(b.textContent ?? ''))!;
    await user.click(freshersBtn);

    // Now Tier-1, Tier-2, Tier-3 buttons should be visible
    const buttonsAfter = screen.getAllByRole('button');
    const labelsAfter = buttonsAfter.map((b) => b.textContent ?? '');
    expect(labelsAfter.some((t) => /Tier.1/i.test(t))).toBe(true);
    expect(labelsAfter.some((t) => /Tier.2/i.test(t))).toBe(true);
    expect(labelsAfter.some((t) => /Tier.3/i.test(t))).toBe(true);
  });

  it('keeps Tier-1 companies hidden until Tier-1 sub-accordion is opened', async () => {
    const user = userEvent.setup();
    renderPage();

    const freshersBtn = screen.getAllByRole('button').find((b) => /Freshers/i.test(b.textContent ?? ''))!;
    await user.click(freshersBtn);

    const tier1Btn = screen.getAllByRole('button').find((b) => /Tier.1/i.test(b.textContent ?? ''))!;
    expect(screen.queryByRole('button', { name: /Razorpay/i })).not.toBeInTheDocument();

    await user.click(tier1Btn);
    expect((await screen.findAllByRole('button', { name: /Razorpay/i })).length).toBeGreaterThan(0);
  });

  it('Experienced accordion expands to show Product-Based and Service-Based categories', async () => {
    const user = userEvent.setup();
    renderPage();

    const experiencedBtn = screen.getAllByRole('button').find((b) => /Experienced/i.test(b.textContent ?? ''))!;
    await user.click(experiencedBtn);

    const buttons = screen.getAllByRole('button');
    const labels = buttons.map((b) => b.textContent ?? '');
    expect(labels.some((t) => t.startsWith('Product-Based'))).toBe(true);
    expect(labels.some((t) => t.startsWith('Service-Based'))).toBe(true);
  });

  it('Experienced accordion shows Product-Based and Service-Based companies correctly', async () => {
    const user = userEvent.setup();
    renderPage();

    const experiencedBtn = screen.getAllByRole('button').find((b) => /Experienced/i.test(b.textContent ?? ''))!;
    await user.click(experiencedBtn);

    const productBtn = screen.getAllByRole('button').find((b) => b.textContent?.startsWith('Product-Based'))!;
    const serviceBtn = screen.getAllByRole('button').find((b) => b.textContent?.startsWith('Service-Based'))!;

    // Product companies (like Google) should be hidden initially
    expect(screen.queryByText('Google')).not.toBeInTheDocument();

    await user.click(productBtn);
    // Now Google should be visible
    expect(screen.getByText('Google')).toBeInTheDocument();

    // Service companies (like TCS) should be hidden initially
    expect(screen.queryByText('TCS')).not.toBeInTheDocument();

    await user.click(serviceBtn);
    // Now TCS should be visible
    expect(screen.getByText('TCS')).toBeInTheDocument();
  });

  it('search input filters companies across categories and auto-expands categories', async () => {
    const user = userEvent.setup();
    renderPage();
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Google');

    // Google should be visible automatically because search active auto-expands matching categories
    expect((await screen.findAllByText(/Google/)).length).toBeGreaterThan(0);
  });

  it('expands a company card to show detailed interview information', async () => {
    const user = userEvent.setup();
    renderPage();

    const freshersBtn = screen.getAllByRole('button').find((b) => /Freshers/i.test(b.textContent ?? ''))!;
    await user.click(freshersBtn);

    const tier1Btn = screen.getAllByRole('button').find((b) => /Tier.1/i.test(b.textContent ?? ''))!;
    await user.click(tier1Btn);

    const razorpayButton = (await screen.findAllByText('Razorpay'))[0].closest('button');
    expect(razorpayButton).not.toBeNull();

    await user.click(razorpayButton!);

    expect(screen.getByText('No negative marking')).toBeInTheDocument();
    expect(screen.getByText('Rounds & Format')).toBeInTheDocument();
    expect(screen.getByText('Exam Pattern')).toBeInTheDocument();
    expect(screen.getByText('Interview Focus')).toBeInTheDocument();
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
