'use client';

import { SessionProvider } from 'next-auth/react';
import { AppShell } from '@/components/app/app-shell';
import { ToastProvider } from '@/components/shared/toast';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider>
        <AppShell>{children}</AppShell>
      </ToastProvider>
    </SessionProvider>
  );
}
