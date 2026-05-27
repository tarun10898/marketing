import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompetitorScanPage from '@/app/product-strategy/competitor-scan/page';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/shared/components/strategy-page', () => ({
  StrategyDetailPageShell: ({ children, current, leftNav, rightNav }: any) => (
    <div data-testid="shell">
      <header>Shell Navigation - {current}</header>
      <a href={leftNav.href}>{leftNav.label}</a>
      <a href={rightNav.href}>{rightNav.label}</a>
      <main>{children}</main>
    </div>
  ),
  StrategySectionTitle: ({ title }: any) => <h2>{title}</h2>,
}));

describe('CompetitorScanPage Features', () => {
  it('renders correctly and defaults to Global tab', () => {
    render(<CompetitorScanPage />);

    expect(screen.getByTestId('shell')).toBeInTheDocument();
    expect(screen.getByText('Shell Navigation - Competitor Scan')).toBeInTheDocument();
    
    // Check that Global tab is active and visible
    expect(screen.getByRole('button', { name: /Global Platforms/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Global Competitors' })).toBeInTheDocument();
  });

  it('filters competitors across tabs using search input', async () => {
    const user = userEvent.setup();
    render(<CompetitorScanPage />);

    const searchInput = screen.getByPlaceholderText('Search platform name, features, model...');
    expect(searchInput).toBeInTheDocument();

    // Type query
    await user.type(searchInput, 'Coursera');
    expect(screen.getByText('Coursera')).toBeInTheDocument();
    expect(screen.queryByText('Udemy')).not.toBeInTheDocument();

    // Toggle clear search button
    const clearBtn = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearBtn);
    expect(searchInput).toHaveValue('');
    expect(screen.getByText('Udemy')).toBeInTheDocument();
  });

  it('switches between tabs and filters glossary list', async () => {
    const user = userEvent.setup();
    render(<CompetitorScanPage />);

    const indianTabBtn = screen.getByRole('button', { name: /Indian Platforms/i });
    const glossaryTabBtn = screen.getByRole('button', { name: /Content Models Glossary/i });

    // Switch to Indian tab
    await user.click(indianTabBtn);
    expect(screen.getByRole('heading', { name: 'Indian Competitors' })).toBeInTheDocument();
    expect(screen.getByText('Coding Ninjas')).toBeInTheDocument();

    // Switch to Glossary tab
    await user.click(glossaryTabBtn);
    expect(screen.getByText('Content Creation Model Glossary')).toBeInTheDocument();
    expect(screen.getAllByText('Marketplace').length).toBeGreaterThan(0);

    // Search inside glossary
    const searchInput = screen.getByPlaceholderText('Search platform name, features, model...');
    await user.type(searchInput, 'Marketplace');
    expect(screen.getAllByText('Marketplace').length).toBeGreaterThan(0);
    expect(screen.queryByText('Aggregator')).not.toBeInTheDocument();
  });

  it('toggles accordion details for global platforms on click', async () => {
    const user = userEvent.setup();
    render(<CompetitorScanPage />);

    // Click Coursera row to expand
    const courseraRow = screen.getByText('Coursera').closest('tr')!;
    expect(screen.queryByText('What It Provides')).not.toBeInTheDocument();

    await user.click(courseraRow);
    expect(screen.getByText('What It Provides')).toBeInTheDocument();
    expect(screen.getByText('University courses, Professional Certificates, Degrees')).toBeInTheDocument();

    // Click again to collapse
    await user.click(courseraRow);
    expect(screen.queryByText('What It Provides')).not.toBeInTheDocument();
  });

  it('toggles accordion details for Indian platforms on click', async () => {
    const user = userEvent.setup();
    render(<CompetitorScanPage />);

    // Switch to Indian tab
    const indianTabBtn = screen.getByRole('button', { name: /Indian Platforms/i });
    await user.click(indianTabBtn);

    // Find the Indian Competitors section
    const indianSection = screen.getByRole('heading', { name: 'Indian Competitors' }).closest('section')!;
    const scalerRow = within(indianSection).getByText('Scaler').closest('tr')!;
    expect(screen.queryByText('What It Provides')).not.toBeInTheDocument();

    await user.click(scalerRow);
    expect(screen.getByText('What It Provides')).toBeInTheDocument();
    expect(screen.getByText('Full Stack, DSA, System Design')).toBeInTheDocument();

    // Click again to collapse
    await user.click(scalerRow);
    expect(screen.queryByText('What It Provides')).not.toBeInTheDocument();
  });

  it('displays empty state messages when search matches nothing', async () => {
    const user = userEvent.setup();
    render(<CompetitorScanPage />);

    const searchInput = screen.getByPlaceholderText('Search platform name, features, model...');
    await user.type(searchInput, 'NonExistentPlatformNameXYZ');

    // Global tab shows empty message
    expect(screen.getByText('No global platforms match your search.')).toBeInTheDocument();

    // Switch to Indian tab
    const indianTabBtn = screen.getByRole('button', { name: /Indian Platforms/i });
    await user.click(indianTabBtn);
    expect(screen.getByText('No Indian platforms match your search.')).toBeInTheDocument();

    // Switch to Glossary tab
    const glossaryTabBtn = screen.getByRole('button', { name: /Content Models Glossary/i });
    await user.click(glossaryTabBtn);
    expect(screen.getByText('No glossary models match your search.')).toBeInTheDocument();
  });
});
