import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Market Placement Strategy – EasyLoops',
  description:
    'EasyLoops Market Placement Strategy: competitor scan, positioning, promotion, pricing, and resources.',
};

export default function ProductStrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
