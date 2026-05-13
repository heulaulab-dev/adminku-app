'use client';

import { useState } from 'react';
import { Copy, Share2, Bold, Italic, List, Check } from 'lucide-react';
import { useToast } from '@/components/shared/toast';
import { parseWhatsAppText } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export function MessageFormatter() {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleFormat = () => {
    const formatted = parseWhatsAppText(input);
    setPreview(formatted);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preview || parseWhatsAppText(input));
      setCopied(true);
      showToast('Tersalin! Paste ke WhatsApp');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Gagal menyalin', 'error');
    }
  };

  const handleShare = async () => {
    const text = preview || parseWhatsAppText(input);
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled or error
      }
    } else {
      await handleCopy();
      showToast('Tersalin! Paste ke WhatsApp');
    }
  };

  const insertFormatting = (before: string, after: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = input.substring(start, end);

    if (selected) {
      const newText =
        input.substring(0, start) + before + selected + after + input.substring(end);
      setInput(newText);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => insertFormatting('**', '**')}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-bg)]"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => insertFormatting('_', '_')}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-bg)]"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => insertFormatting('\n• ', '')}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-bg)]"
          title="Bullet"
        >
          <List className="h-4 w-4" />
        </button>
        <div className="ml-auto text-xs text-[var(--color-text-muted)]">
          Gunakan **text** untuk bold, _text_ untuk italic
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
          Ketik pesan kamu
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan di sini...

Contoh:
Hai **Nama**! Terima kasih sudah order.

• Product A - Rp 100.000
• Product B - Rp 50.000

*Total: Rp 150.000*

Transfer ke **BCA 123456789 a/n TokoKu**"
          className="min-h-[200px] w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
        />
      </div>

      {/* Format Button */}
      <button
        onClick={handleFormat}
        className="w-full rounded-lg bg-[var(--color-primary)] py-3 font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      >
        Format Pesan
      </button>

      {/* Preview */}
      {preview && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Preview WhatsApp</span>
          </div>
          <div className="whitespace-pre-wrap p-4 text-[var(--color-text-primary)]">{preview}</div>
          <div className="flex gap-2 border-t border-[var(--color-border)] p-3">
            <button
              onClick={handleCopy}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all',
                copied
                  ? 'bg-[var(--color-success)] text-white'
                  : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
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
            <button
              onClick={handleShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
            >
              <Share2 className="h-4 w-4" />
              Bagikan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
