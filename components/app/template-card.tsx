'use client';

import { useState } from 'react';
import { Copy, Edit2, Trash2, Check, MoreVertical } from 'lucide-react';
import type { Template } from '@/lib/types';
import { useToast } from '@/components/shared/toast';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onEdit, onDelete }: TemplateCardProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.content);
      setCopied(true);
      showToast('Tersalin! Paste ke WhatsApp');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Gagal menyalin', 'error');
    }
  };

  return (
    <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:border-[var(--color-primary)]/30 hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-[var(--color-text-primary)]">{template.name}</h3>
          {template.category && (
            <span className="mt-1 inline-block rounded-md bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
              {template.category}
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg">
              <button
                onClick={() => {
                  onEdit(template);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(template.id);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="line-clamp-3 mt-2 whitespace-pre-wrap text-sm text-[var(--color-text-secondary)]">
        {template.content}
      </p>
      <button
        onClick={handleCopy}
        className={cn(
          'mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all',
          copied
            ? 'bg-[var(--color-success)] text-white'
            : 'bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
        )}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Tersalin!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Salin
          </>
        )}
      </button>
    </div>
  );
}
