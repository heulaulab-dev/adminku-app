'use client';

import { useState } from 'react';
import { X, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, category: string) => void;
  onDelete?: () => void;
  initialName?: string;
  initialCategory?: string;
  title?: string;
  isEdit?: boolean;
}

const CATEGORIES = ['greeting', 'quotation', 'invoice', 'payment', 'shipping', 'closing', 'other'];

export function TemplateModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialName = '',
  initialCategory = 'other',
  title = 'Simpan sebagai Template',
  isEdit = false,
}: TemplateModalProps) {
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState(initialCategory);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), category);
      if (!isEdit) {
        setName('');
        setCategory('other');
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
            <Bookmark className="h-5 w-5 text-[var(--color-primary)]" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Nama Template
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Quotation Jersey Size M"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded-lg border border-[var(--color-error)]/30 px-4 py-2.5 text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
            >
              Hapus
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className={cn(
              'flex-1 rounded-lg py-2.5 text-sm font-medium text-white',
              name.trim()
                ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
                : 'bg-[var(--color-text-muted)] cursor-not-allowed'
            )}
          >
            {isEdit ? 'Update' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}
