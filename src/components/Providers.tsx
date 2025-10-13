'use client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Universal system is now built into the hook - no provider needed */}
      {children}
    </>
  );
}