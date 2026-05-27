import nextConfig from '../../next.config';
import { contentSecurityPolicy } from '../../config/security';

describe('Security headers', () => {
  it('disables the x-powered-by header and applies a global header policy', async () => {
    expect(nextConfig.poweredByHeader).toBe(false);
    expect(nextConfig.headers).toBeDefined();

    const routes = await nextConfig.headers?.();
    expect(routes).toHaveLength(1);
    expect(routes?.[0]?.source).toBe('/(.*)');

    const headerMap = new Map(routes?.[0]?.headers.map((header) => [header.key, header.value]));

    expect(headerMap.get('Content-Security-Policy')).toBe(contentSecurityPolicy);
    expect(headerMap.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headerMap.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headerMap.get('X-Frame-Options')).toBe('DENY');
    expect(headerMap.get('Permissions-Policy')).toContain('camera=()');
  });

  it('locks down key CSP directives', () => {
    expect(contentSecurityPolicy).toContain("default-src 'self'");
    expect(contentSecurityPolicy).toContain("object-src 'none'");
    expect(contentSecurityPolicy).toContain("base-uri 'self'");
    expect(contentSecurityPolicy).toContain("form-action 'self'");
    expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");
  });
});