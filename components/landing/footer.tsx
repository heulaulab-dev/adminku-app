import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">{APP_NAME}</span>
          </div>
          <nav className="flex gap-6 text-sm text-[var(--color-text-secondary)]">
            <Link href="/tentang" className="hover:text-[var(--color-text-primary)]">
              Tentang
            </Link>
            <Link href="/kebijakan" className="hover:text-[var(--color-text-primary)]">
              Kebijakan Privasi
            </Link>
            <Link href="/kontak" className="hover:text-[var(--color-text-primary)]">
              Kontak
            </Link>
          </nav>
          <p className="text-sm text-[var(--color-text-muted)]">
            © 2026 {APP_NAME}. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
