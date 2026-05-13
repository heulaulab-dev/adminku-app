'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Copy, Share2, Check } from 'lucide-react';
import { formatList, formatMoney } from '@/lib/formatters';
import { orderRecapSchema, type OrderRecapInput } from '@/lib/schemas';
import { useToast } from '@/components/shared/toast';
import { cn } from '@/lib/utils';

export function OrderRecapForm() {
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderRecapInput>({
    resolver: zodResolver(orderRecapSchema),
    defaultValues: {
      customerName: '',
      items: [{ id: '1', name: '', quantity: 1, price: 0 }],
      shippingCost: 0,
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');
  const watchedShipping = watch('shippingCost') || 0;

  const subtotal = watchedItems?.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  ) || 0;

  const total = subtotal + watchedShipping;

  const onSubmit = (data: OrderRecapInput) => {
    const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + (data.shippingCost || 0);

    let message = `Halo ${data.customerName}! 🙏\n\n`;
    message += `Berikut ringkasan pesanan kamu:\n\n`;
    message += formatList(
      data.items.map(
        (item) =>
          `${item.name} (${item.quantity}x) - ${formatMoney(item.price * item.quantity)}`
      )
    );

    if (data.shippingCost && data.shippingCost > 0) {
      message += `\n\n*Ongkir:* ${formatMoney(data.shippingCost)}`;
    }

    message += `\n\n═══════════════════════`;
    message += `\n*TOTAL: ${formatMoney(totalAmount)}*`;
    message += `\n═══════════════════════`;

    if (data.notes) {
      message += `\n\n📝 Catatan:\n${data.notes}`;
    }

    message += `\n\nMohon konfirmasi ya!`;
    setPreview(message);
    showToast('Order recap sudah jadi!');
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

      {/* Items */}
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Daftar Pesanan</h3>
          <button
            type="button"
            onClick={() => append({ id: Math.random().toString(), name: '', quantity: 1, price: 0 })}
            className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
          >
            <Plus className="h-4 w-4" />
            Tambah Item
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-lg border border-[var(--color-border)] p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-muted)]">Item {index + 1}</span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-error)]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <input
                {...register(`items.${index}.name`)}
                placeholder="Nama produk"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Jumlah</label>
                <input
                  type="number"
                  {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                  min="1"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Harga</label>
                <input
                  type="number"
                  {...register(`items.${index}.price`, { valueAsNumber: true })}
                  min="0"
                  placeholder="0"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Shipping Cost */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
            Ongkos Kirim
          </label>
          <input
            type="number"
            {...register('shippingCost', { valueAsNumber: true })}
            min="0"
            placeholder="0"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-lg bg-[var(--color-primary)] px-4 py-4">
          <span className="font-semibold text-white">TOTAL</span>
          <span className="text-xl font-bold text-white">
            {formatMoney(total)}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">Catatan (Opsional)</h3>
        <textarea
          {...register('notes')}
          placeholder="Tambahkan catatan..."
          rows={2}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      >
        Generate Order Recap
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
