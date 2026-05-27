import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { bodyFont, displayFont } from '@/config/fonts';
import { rootThemeVariables } from '@/app/config-layout/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'EasyLoops Internal',
  description: 'EasyLoops internal product market placement strategy dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={rootThemeVariables as CSSProperties}>
      <body suppressHydrationWarning className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
