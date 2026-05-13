'use client';

import { useSession, signOut } from 'next-auth/react';
import { User, LogOut } from 'lucide-react';
import { BottomNav } from './bottom-nav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20">
      {/* Header with user info and logout */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">AdminKu</span>
          </div>
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 text-sm text-[var(--color-text-secondary)] sm:flex">
                <User className="h-4 w-4" />
                <span className="max-w-[150px] truncate">{session.user.name || session.user.email}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-error)]"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
