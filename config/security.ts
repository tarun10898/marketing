const isDevelopment = process.env.NODE_ENV !== 'production';

function buildContentSecurityPolicy() {
  const scriptSources = ["'self'", "'unsafe-inline'"];
  const connectSources = ["'self'", 'https:', 'wss:'];

  if (isDevelopment) {
    scriptSources.push("'unsafe-eval'");
    connectSources.push('http:', 'ws:');
  }

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src ${connectSources.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  if (!isDevelopment) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

export const contentSecurityPolicy = buildContentSecurityPolicy();

export const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), geolocation=(), microphone=(), browsing-topics=()',
  },
  ...(!isDevelopment
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
] as const;