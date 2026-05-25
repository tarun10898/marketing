import { render, screen } from '@testing-library/react';
import ResourcesPage from '@/app/product-strategy/resources/page';

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

describe('ResourcesPage', () => {
  it('renders the page heading', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('heading', { name: /Resources/i })).toBeInTheDocument();
  });

  it('renders the EasyLoops Strategy Document card', () => {
    render(<ResourcesPage />);
    expect(screen.getByText('EasyLoops Strategy Document')).toBeInTheDocument();
  });

  it('resource link opens in a new tab with noopener', () => {
    render(<ResourcesPage />);
    const links = screen.getAllByRole('link').filter(
      (l) => l.getAttribute('target') === '_blank'
    );
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('shows the Google Doc badge', () => {
    render(<ResourcesPage />);
    expect(screen.getByText('Google Doc')).toBeInTheDocument();
  });

  it('renders breadcrumb back to Product Strategy', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });
});
