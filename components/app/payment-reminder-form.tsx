'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Share2, Check, Bell } from 'lucide-react';
import { formatPaymentReminder } from '@/lib/formatters';
import { paymentReminderSchema, type PaymentReminderInput } from '@/lib/schemas';
import { useToast } from '@/components/shared/toast';
import { formatMoney } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export function PaymentReminderForm() {
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentReminderInput>({
    resolver: zodResolver(paymentReminderSchema),
    defaultValues: {
      customerName: '',
      amount: 0,
      dueDate: '',
      paymentMethod: '',
      paymentNumber: '',
      accountName: '',
    },
  });

  const watchedAmount = watch('amount');

  const onSubmit = (data: PaymentReminderInput) => {
    const formatted = formatPaymentReminder(data);
    setPreview(formatted);
    showToast('Payment reminder sudah jadi!');
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

      {/* Payment Info */}
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Info Pembayaran</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Jumlah (Rp) *
            </label>
            <input
              type="number"
              {...register('amount', { valueAsNumber: true })}
              min="0"
              placeholder="0"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.amount.message}</p>
            )}
            {watchedAmount > 0 && (
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Terbilang: {formatMoney(watchedAmount)}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Batas Waktu *
            </label>
            <input
              type="date"
              {...register('dueDate')}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.dueDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
            Metode Pembayaran *
          </label>
          <select
            {...register('paymentMethod')}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          >
            <option value="">Pilih metode</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BNI">BNI</option>
            <option value="BRI">BRI</option>
            <option value="OVO">OVO</option>
            <option value="Dana">Dana</option>
            <option value="GoPay">GoPay</option>
            <option value="ShopeePay">ShopeePay</option>
          </select>
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-[var(--color-error)]">{errors.paymentMethod.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Nomor Rekening *
            </label>
            <input
              {...register('paymentNumber')}
              placeholder="Contoh: 1234567890"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            {errors.paymentNumber && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.paymentNumber.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Nama Pemilik *
            </label>
            <input
              {...register('accountName')}
              placeholder="Nama pemilik rekening"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            {errors.accountName && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.accountName.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      >
        Generate Payment Reminder
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
