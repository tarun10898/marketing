import { fireEvent, render, screen } from '@testing-library/react';
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
  it('renders the strategy title', () => {
    render(<SimpleHeader />);
    expect(screen.getByRole('link', { name: /easyloops internal/i })).toBeInTheDocument();
  });

  it('strategy title links to strategy home', () => {
    render(<SimpleHeader />);
    expect(screen.getByRole('link', { name: /easyloops internal/i })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });

  it('renders the dark mode toggle button', () => {
    render(<SimpleHeader />);
    expect(screen.getByRole('button', { name: 'Toggle dark mode' })).toBeInTheDocument();
  });

  it('toggles dark class on <html> when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SimpleHeader />);
    const btn = screen.getByRole('button', { name: 'Toggle dark mode' });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    await user.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    await user.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('updates header visual style after scrolling', () => {
    render(<SimpleHeader />);
    const header = screen.getByRole('banner');

    expect(header.className).toContain('bg-white/35');

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 24,
      writable: true,
    });
    fireEvent.scroll(window);

    expect(header.className).toContain('bg-white/55');
  });
});
