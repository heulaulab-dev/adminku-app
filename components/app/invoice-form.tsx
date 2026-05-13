'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Copy, Share2, Check, Bookmark, Package } from 'lucide-react';
import { invoiceSchema, type InvoiceInput } from '@/lib/schemas';
import { formatInvoice, formatMoney } from '@/lib/formatters';
import { useToast } from '@/components/shared/toast';
import { INVOICE_DEFAULTS } from '@/lib/constants';
import { TemplateModal } from '@/components/shared/template-modal';
import { ProductPickerModal } from './product-picker-modal';
import { useTemplates, useInvoiceHistory, useUsageStats, useProducts } from '@/lib/store';
import type { Product, Customer } from '@/lib/types';
import { cn } from '@/lib/utils';

export function InvoiceForm() {
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templatePreview, setTemplatePreview] = useState('');
  const [showProductPicker, setShowProductPicker] = useState(false);
  const { showToast } = useToast();
  const { addTemplate } = useTemplates();
  const { addInvoice } = useInvoiceHistory();
  const { recordUsage } = useUsageStats();
  const { products } = useProducts();

  const invoiceNumber = `${INVOICE_DEFAULTS.prefix}-${Date.now().toString(36).toUpperCase()}`;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [{ id: '1', name: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');
  const total = watchedItems?.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  ) || 0;

  const onSubmit = (data: InvoiceInput) => {
    const formatted = formatInvoice({
      ...data,
      invoiceNumber,
    });
    setPreview(formatted);
    showToast('Invoice sudah jadi!');

    // Save to history
    const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    addInvoice({
      invoiceNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items,
      notes: data.notes,
      paymentMethod: data.paymentMethod,
      total: totalAmount,
      formattedMessage: formatted,
    });
    recordUsage('invoice');
  };

  const handleAddProducts = (selectedProducts: Product[], customer?: Customer) => {
    // Append each product as new item
    selectedProducts.forEach((product) => {
      append({ id: Math.random().toString(), name: product.name, quantity: 1, price: product.price });
    });

    // Auto-fill customer if selected
    if (customer) {
      setValue('customerName', customer.name);
      setValue('customerPhone', customer.phone);
    }

    showToast(`${selectedProducts.length} produk ditambahkan!`);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Invoice Number */}
      <div className="rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary-light)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-secondary)]">No. Invoice</span>
          <span className="font-mono font-semibold text-[var(--color-primary)]">{invoiceNumber}</span>
        </div>
      </div>

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
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
            No. WhatsApp
          </label>
          <input
            {...register('customerPhone')}
            placeholder="08xxxxxxxxxx"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Daftar Produk</h3>
          <div className="flex gap-2">
            {products.length > 0 && (
              <button
                type="button"
                onClick={() => setShowProductPicker(true)}
                className="flex items-center gap-1 rounded-lg border border-[var(--color-primary)]/30 px-3 py-1.5 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
              >
                <Package className="h-4 w-4" />
                Katalog
              </button>
            )}
            <button
              type="button"
              onClick={() => append({ id: Math.random().toString(), name: '', quantity: 1, price: 0 })}
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
            >
              <Plus className="h-4 w-4" />
              Tambah Produk
            </button>
          </div>
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

        {/* Total */}
        <div className="flex items-center justify-between rounded-lg bg-[var(--color-primary)] px-4 py-4">
          <span className="font-semibold text-white">TOTAL</span>
          <span className="text-xl font-bold text-white">
            {formatMoney(total)}
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">Metode Pembayaran</h3>
        <select
          {...register('paymentMethod')}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
        >
          <option value="">Pilih metode pembayaran</option>
          {INVOICE_DEFAULTS.paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
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
        Generate Invoice
      </button>

      {/* Preview */}
      {preview && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
            <span className="font-semibold text-[var(--color-text-primary)]">Preview Invoice</span>
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
            <button
              type="button"
              onClick={() => {
                setTemplatePreview(preview);
                setShowTemplateModal(true);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-primary)]/30 bg-[var(--color-surface)] py-2.5 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            >
              <Bookmark className="h-4 w-4" />
              Simpan Template
            </button>
          </div>
        </div>
      )}

      {/* Save as Template Modal */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSave={(name, category) => {
          addTemplate({
            name,
            content: templatePreview,
            category,
          });
          showToast('Template berhasil disimpan!');
        }}
        title="Simpan Invoice sebagai Template"
      />
    </form>

    <ProductPickerModal
      isOpen={showProductPicker}
      onClose={() => setShowProductPicker(false)}
      onAdd={handleAddProducts}
    />
    </>
  );
}
