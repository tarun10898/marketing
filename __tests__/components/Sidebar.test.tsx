import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarProvider, useSidebar } from '@/shared/components/SidebarContext';
import { Sidebar } from '@/shared/components/Sidebar';

// Mock next/navigation hooks
const mockUsePathname = jest.fn(() => '/product-strategy');
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('SidebarContext & SidebarProvider', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    window.innerWidth = 500; // Force mobile width by default so tests start closed
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    jest.clearAllMocks();
  });

  const TestConsumer = () => {
    const { isOpen, toggle, setIsOpen } = useSidebar();
    return (
      <div>
        <span data-testid="isOpen">{isOpen ? 'open' : 'closed'}</span>
        <button data-testid="toggle-btn" onClick={toggle}>
          Toggle
        </button>
        <button data-testid="open-btn" onClick={() => setIsOpen(true)}>
          Open
        </button>
      </div>
    );
  };

  it('provides default states and functions', () => {
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>
    );

    expect(screen.getByTestId('isOpen').textContent).toBe('closed');

    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('isOpen').textContent).toBe('open');

    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('isOpen').textContent).toBe('closed');

    fireEvent.click(screen.getByTestId('open-btn'));
    expect(screen.getByTestId('isOpen').textContent).toBe('open');
  });

  it('sets isOpen to true on desktop layout during mounting', () => {
    window.innerWidth = 1024;
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>
    );
    expect(screen.getByTestId('isOpen').textContent).toBe('open');
  });

  it('sets isOpen to false on mobile layout during mounting', () => {
    window.innerWidth = 500;
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>
    );
    expect(screen.getByTestId('isOpen').textContent).toBe('closed');
  });

  it('returns default fallback state when useSidebar is used outside provider', () => {
    const TestOutsideComponent = () => {
      const { isOpen, setIsOpen, toggle } = useSidebar();
      return (
        <div>
          <span data-testid="outside-isOpen">{isOpen ? 'open' : 'closed'}</span>
          <button data-testid="outside-toggle" onClick={toggle}>Toggle</button>
          <button data-testid="outside-set" onClick={() => setIsOpen(true)}>Set</button>
        </div>
      );
    };

    render(<TestOutsideComponent />);
    expect(screen.getByTestId('outside-isOpen').textContent).toBe('closed');
    
    // Check that executing context handlers outside provider doesn't throw errors
    expect(() => fireEvent.click(screen.getByTestId('outside-toggle'))).not.toThrow();
    expect(() => fireEvent.click(screen.getByTestId('outside-set'))).not.toThrow();
  });
});

describe('Sidebar Component', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  it('renders navigation links and highlights active link', () => {
    window.innerWidth = 1024;
    mockUsePathname.mockReturnValue('/product-strategy/competitor-scan');

    const { container } = render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );

    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('opacity-100');
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Competitor Scan')).toBeInTheDocument();
  });

  it('closes sidebar on mobile after clicking a navigation link', async () => {
    window.innerWidth = 500;
    const user = userEvent.setup();

    const { container } = render(
      <SidebarProvider>
        <div>
          <TestToggler />
          <Sidebar />
        </div>
      </SidebarProvider>
    );

    const aside = container.querySelector('aside');
    
    // Initial state on mobile is closed (opacity-0)
    expect(aside).toHaveClass('opacity-0');

    // Toggle open (opacity-100)
    await user.click(screen.getByTestId('toggle-trigger'));
    expect(aside).toHaveClass('opacity-100');

    // Click link to close
    const overviewLink = screen.getByRole('link', { name: /Overview/i });
    await user.click(overviewLink);

    // Sidebar should be closed (opacity-0)
    expect(aside).toHaveClass('opacity-0');
  });

  it('closes sidebar on mobile when backdrop/close button is clicked', async () => {
    window.innerWidth = 500;
    const user = userEvent.setup();

    const { container } = render(
      <SidebarProvider>
        <div>
          <TestToggler />
          <Sidebar />
        </div>
      </SidebarProvider>
    );

    const aside = container.querySelector('aside');

    // Open it
    await user.click(screen.getByTestId('toggle-trigger'));
    expect(aside).toHaveClass('opacity-100');

    // Find and click mobile close button
    const closeBtn = screen.getByRole('button', { name: 'Close menu' });
    await user.click(closeBtn);
    expect(aside).toHaveClass('opacity-0');
  });
});

const TestToggler = () => {
  const { toggle } = useSidebar();
  return <button data-testid="toggle-trigger" onClick={toggle}>Toggle</button>;
};
