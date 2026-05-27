import Home from '@/app/page';
import RootLayout, { metadata as rootMetadata } from '@/app/layout';
import ProductStrategyLayout, {
  metadata as productStrategyMetadata,
} from '@/app/product-strategy/layout';

const mockRedirect = jest.fn();

jest.mock('next/navigation', () => ({
  redirect: (path: string) => mockRedirect(path),
}));

describe('App shell pages/layouts', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it('redirects home route to product strategy', () => {
    Home();
    expect(mockRedirect).toHaveBeenCalledWith('/product-strategy');
  });

  it('exports expected root metadata', () => {
    expect(rootMetadata.title).toBe('EasyLoops Internal');
    expect(rootMetadata.description).toContain('internal product market placement strategy dashboard');
  });

  it('renders root layout html/body wrappers with children', () => {
    const element = RootLayout({ children: <div data-testid="child">Child</div> });

    expect(element.type).toBe('html');
    expect(element.props.lang).toBe('en');
    expect(element.props.children.type).toBe('body');
    expect(element.props.children.props.children.props['data-testid']).toBe('child');
  });

  it('exports expected product strategy metadata and passes children through', () => {
    expect(productStrategyMetadata.title).toBe('EasyLoops Internal – Product Strategy');

    const child = <section data-testid="ps-child">PS Child</section>;
    const element = ProductStrategyLayout({ children: child });

    expect(element.props.children).toBe(child);
  });
});
