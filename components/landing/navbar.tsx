import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)]">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <span className="font-semibold text-[var(--color-text-primary)]">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
          >
            Harga
          </Link>
          <Link
            href="/app"
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            Mulai Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}
