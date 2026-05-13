'use client';

import { useState } from 'react';
import { Copy, Share2, Check, Trash2, FileText, Receipt, Clock, MoreVertical } from 'lucide-react';
import type { QuotationHistory, InvoiceHistory } from '@/lib/types';
import { formatMoney } from '@/lib/formatters';
import { useToast } from '@/components/shared/toast';
import { cn } from '@/lib/utils';

interface HistoryItemProps {
  title: string;
  customer: string;
  date: Date;
  total: number;
  preview: string;
  onDelete: () => void;
  type: 'quotation' | 'invoice';
  invoiceNumber?: string;
}

function HistoryItem({ title, customer, date, total, preview, onDelete, type, invoiceNumber }: HistoryItemProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preview);
      setCopied(true);
      showToast('Tersalin! Paste ke WhatsApp');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Gagal menyalin', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: preview });
      } catch {
        // User cancelled
      }
    } else {
      await handleCopy();
    }
  };

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:border-[var(--color-primary)]/30">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {type === 'quotation' ? (
              <FileText className="h-4 w-4 text-[var(--color-primary)]" />
            ) : (
              <Receipt className="h-4 w-4 text-[var(--color-secondary)]" />
            )}
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
              {invoiceNumber ? `${title} ${invoiceNumber}` : title}
            </span>
          </div>
          <h3 className="mt-1 truncate font-medium text-[var(--color-text-primary)]">{customer}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Clock className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--color-primary)]">{formatMoney(total)}</span>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full z-10 mt-1 w-32 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg">
                <button
                  onClick={() => { onDelete(); setShowMenu(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleCopy}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all',
            copied
              ? 'bg-[var(--color-success)] text-white'
              : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
          )}
        >
          {copied ? <><Check className="h-4 w-4" /> Tersalin!</> : <><Copy className="h-4 w-4" /> Salin</>}
        </button>
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
        >
          <Share2 className="h-4 w-4" />
          Bagikan
        </button>
      </div>
    </div>
  );
}

interface QuotationHistoryListProps {
  history: QuotationHistory[];
  onDelete: (id: string) => void;
  isLoaded: boolean;
}

export function QuotationHistoryList({ history, onDelete, isLoaded }: QuotationHistoryListProps) {
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12">
        <FileText className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
        <p className="mb-2 font-medium text-[var(--color-text-primary)]">Belum ada quotation</p>
        <p className="text-sm text-[var(--color-text-secondary)]">Quotation yang kamu buat akan muncul di sini</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryItem
          key={item.id}
          title="Quotation"
          customer={item.customerName}
          date={item.createdAt}
          total={item.total}
          preview={item.formattedMessage}
          onDelete={() => onDelete(item.id)}
          type="quotation"
        />
      ))}
    </div>
  );
}

interface InvoiceHistoryListProps {
  history: InvoiceHistory[];
  onDelete: (id: string) => void;
  isLoaded: boolean;
}

export function InvoiceHistoryList({ history, onDelete, isLoaded }: InvoiceHistoryListProps) {
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12">
        <Receipt className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
        <p className="mb-2 font-medium text-[var(--color-text-primary)]">Belum ada invoice</p>
        <p className="text-sm text-[var(--color-text-secondary)]">Invoice yang kamu buat akan muncul di sini</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryItem
          key={item.id}
          title="Invoice"
          customer={item.customerName}
          date={item.createdAt}
          total={item.total}
          preview={item.formattedMessage}
          onDelete={() => onDelete(item.id)}
          type="invoice"
          invoiceNumber={item.invoiceNumber}
        />
      ))}
    </div>
  );
}