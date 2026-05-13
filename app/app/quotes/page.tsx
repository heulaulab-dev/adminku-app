import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Quotation</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Semua quotation kamu</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12">
        <FileText className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
        <p className="mb-2 font-medium text-[var(--color-text-primary)]">Belum ada quotation</p>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          Yuk bikin quotation pertama kamu
        </p>
        <Link
          href="/app/quotes/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Buat Quotation
        </Link>
      </div>
    </div>
  );
}