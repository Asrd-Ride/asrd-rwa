import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Asset Ride Pro',
  description: 'Manage your RWA investment portfolio',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
