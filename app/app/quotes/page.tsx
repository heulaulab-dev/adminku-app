'use client';

import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import { useQuotationHistory } from '@/lib/store';
import { QuotationHistoryList } from '@/components/app/history-list';

export default function QuotesPage() {
  const { history, isLoaded, deleteQuotation } = useQuotationHistory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Quotation</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {history.length > 0 ? `${history.length} quotation` : 'Semua quotation kamu'}
            </p>
          </div>
        </div>
        <Link
          href="/app/quotes/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Baru
        </Link>
      </div>

      <QuotationHistoryList
        history={history}
        onDelete={deleteQuotation}
        isLoaded={isLoaded}
      />
    </div>
  );
}