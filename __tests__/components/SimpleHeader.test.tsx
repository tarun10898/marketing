import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SimpleHeader } from '@/shared/components';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('SimpleHeader', () => {
  it('renders the EasyLoops brand logo text', () => {
    render(<SimpleHeader />);
    expect(screen.getByText('EL')).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    render(<SimpleHeader />);
    expect(screen.getByText('EasyLoops')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<SimpleHeader />);
    expect(screen.getByText('Competitors')).toBeInTheDocument();
    expect(screen.getByText('Positioning')).toBeInTheDocument();
    expect(screen.getByText('Hiring Tiers')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('nav links point to correct routes', () => {
    render(<SimpleHeader />);
    const competitorsLink = screen.getByRole('link', { name: 'Competitors' });
    expect(competitorsLink).toHaveAttribute('href', '/product-strategy/competitor-scan');

    const positioningLink = screen.getByRole('link', { name: 'Positioning' });
    expect(positioningLink).toHaveAttribute('href', '/product-strategy/positioning');

    const hiringLink = screen.getByRole('link', { name: 'Hiring Tiers' });
    expect(hiringLink).toHaveAttribute('href', '/product-strategy/hiring-tiers');
  });

  it('renders the dark mode toggle button', () => {
    render(<SimpleHeader />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles dark class on <html> when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SimpleHeader />);
    const btn = screen.getByRole('button');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    await user.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    await user.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
