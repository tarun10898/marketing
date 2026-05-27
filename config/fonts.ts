import { Inter, Space_Grotesk } from 'next/font/google';

// next/font requires literal CSS variable names at the loader callsite.
// Keep these values aligned with app/config-layout/theme.ts.
export const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
});