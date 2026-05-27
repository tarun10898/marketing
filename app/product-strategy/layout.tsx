import type { Metadata } from 'next';
import { SidebarProvider } from '@/shared/components';

export const metadata: Metadata = {
  title: 'EasyLoops Internal – Product Strategy',
  description:
    'EasyLoops Market Placement Strategy: competitor scan, positioning, promotion, pricing, and resources.',
};

export default function ProductStrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
