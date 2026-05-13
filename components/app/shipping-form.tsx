'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Share2, Check, Truck, FileText } from 'lucide-react';
import { formatShippingConfirmation } from '@/lib/formatters';
import { shippingSchema, type ShippingInput } from '@/lib/schemas';
import { useToast } from '@/components/shared/toast';
import { cn } from '@/lib/utils';

export function ShippingForm() {
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingInput>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      customerName: '',
      courier: '',
      trackingNumber: '',
      eta: '',
    },
  });

  const onSubmit = (data: ShippingInput) => {
    const formatted = formatShippingConfirmation(data);
    setPreview(formatted);
    showToast('Shipping confirmation sudah jadi!');
  };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Info */}
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Info Customer</h3>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
            Nama Customer *
          </label>
          <input
            {...register('customerName')}
            placeholder="Masukkan nama customer"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-[var(--color-error)]">{errors.customerName.message}</p>
          )}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Info Pengiriman</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Kurir *
            </label>
            <select
              {...register('courier')}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            >
              <option value="">Pilih kurir</option>
              <option value="JNE">JNE</option>
              <option value="J&T">J&T</option>
              <option value="SiCepat">SiCepat</option>
              <option value="AnterAja">AnterAja</option>
              <option value="POS Indonesia">POS Indonesia</option>
              <option value="TIKI">TIKI</option>
              <option value="Ninja Express">Ninja Express</option>
              <option value="GoSend">GoSend</option>
              <option value="GrabExpress">GrabExpress</option>
            </select>
            {errors.courier && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.courier.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              No. Resi *
            </label>
            <input
              {...register('trackingNumber')}
              placeholder="Contoh: JNE1234567890"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            {errors.trackingNumber && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.trackingNumber.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
            Estimasi Tiba (Opsional)
          </label>
          <input
            {...register('eta')}
            placeholder="Contoh: 2-3 hari kerja"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      >
        Generate Shipping Confirmation
      </button>

      {/* Preview */}
      {preview && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
            <span className="font-semibold text-[var(--color-text-primary)]">Preview</span>
          </div>
          <div className="whitespace-pre-wrap p-4 text-sm text-[var(--color-text-primary)]">{preview}</div>
          <div className="flex gap-2 border-t border-[var(--color-border)] p-3">
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all',
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
              type="button"
              onClick={handleShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
            >
              <Share2 className="h-4 w-4" />
              Bagikan
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
