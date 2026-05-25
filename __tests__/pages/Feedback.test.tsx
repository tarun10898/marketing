import { render, screen } from '@testing-library/react';
import FeedbackPage from '@/app/product-strategy/feedback/page';

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

describe('FeedbackPage', () => {
  it('renders the page heading', () => {
    render(<FeedbackPage />);
    expect(screen.getByRole('heading', { name: /Feedback Links/i })).toBeInTheDocument();
  });

  it('renders all 3 feedback link cards', () => {
    render(<FeedbackPage />);
    expect(screen.getByText('Payments Feedback')).toBeInTheDocument();
    expect(screen.getByText('Interview Feedback Form')).toBeInTheDocument();
    expect(screen.getByText('Interview Feedback Responses')).toBeInTheDocument();
  });

  it('feedback links open in a new tab with noopener', () => {
    render(<FeedbackPage />);
    const links = screen.getAllByRole('link').filter(
      (l) => l.getAttribute('target') === '_blank'
    );
    links.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays the correct badge type for each card', () => {
    render(<FeedbackPage />);
    expect(screen.getByText('OneDrive Excel')).toBeInTheDocument();
    expect(screen.getByText('Google Form')).toBeInTheDocument();
    expect(screen.getByText('Google Sheets')).toBeInTheDocument();
  });

  it('renders the breadcrumb back to Product Strategy', () => {
    render(<FeedbackPage />);
    expect(screen.getByRole('link', { name: 'Product Strategy' })).toHaveAttribute(
      'href',
      '/product-strategy'
    );
  });
});
