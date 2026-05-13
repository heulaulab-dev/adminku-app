'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Copy, Share2, Check, Bookmark, Package, X } from 'lucide-react';
import { quotationSchema, type QuotationInput } from '@/lib/schemas';
import { formatQuotation, formatMoney } from '@/lib/formatters';
import { useToast } from '@/components/shared/toast';
import { TemplateModal } from '@/components/shared/template-modal';
import { useTemplates, useQuotationHistory, useUsageStats, useProducts } from '@/lib/store';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

function ProductPicker({
  isOpen,
  onClose,
  onSelect,
  products,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  products: Product[];
}) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[80vh] w-full max-w-lg flex-col rounded-2xl bg-[var(--color-surface)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <h2 className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
            <Package className="h-5 w-5 text-[var(--color-primary)]" />
            Pilih dari Katalog
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-[var(--color-border)] p-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Package className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
              <p className="text-[var(--color-text-secondary)]">
                {search ? 'Produk tidak ditemukan' : 'Belum ada produk di katalog'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    onSelect(product);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left transition-colors hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-bg)]"
                >
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">{product.name}</p>
                    {product.category && (
                      <p className="text-xs text-[var(--color-text-muted)]">{product.category}</p>
                    )}
                  </div>
                  <span className="font-semibold text-[var(--color-primary)]">{formatMoney(product.price)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function QuotationForm() {
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templatePreview, setTemplatePreview] = useState('');
  const [showProductPicker, setShowProductPicker] = useState(false);
  const { showToast } = useToast();
  const { addTemplate } = useTemplates();
  const { addQuotation } = useQuotationHistory();
  const { recordUsage } = useUsageStats();
  const { products } = useProducts();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuotationInput>({
    resolver: zodResolver(quotationSchema),
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

  const onSubmit = (data: QuotationInput) => {
    const formatted = formatQuotation(data);
    setPreview(formatted);
    showToast('Quotation sudah jadi!');

    const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    addQuotation({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      items: data.items,
      notes: data.notes,
      total: totalAmount,
      formattedMessage: formatted,
    });
    recordUsage('quotation');
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

  const handleSelectProduct = (product: Product, index: number) => {
    setValue(`items.${index}.name`, product.name);
    setValue(`items.${index}.price`, product.price);
  };

  return (
    <>
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
          <div className="grid gap-4 sm:grid-cols-2">
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
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
                Alamat
              </label>
              <input
                {...register('customerAddress')}
                placeholder="Alamat pengiriman"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>
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
                Tambah
              </button>
            </div>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-lg border border-[var(--color-border)] p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">Produk {index + 1}</span>
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

          <div className="flex items-center justify-between rounded-lg bg-[var(--color-primary-light)] px-4 py-3">
            <span className="font-medium text-[var(--color-text-primary)]">Total</span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {formatMoney(total)}
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">Catatan (Opsional)</h3>
          <textarea
            {...register('notes')}
            placeholder="Tambahkan catatan untuk customer..."
            rows={3}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
        >
          Generate Quotation
        </button>

        {/* Preview */}
        {preview && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <span className="font-semibold text-[var(--color-text-primary)]">Preview Quotation</span>
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
                  <><Check className="h-4 w-4" /> Tersalin!</>
                ) : (
                  <><Copy className="h-4 w-4" /> Salin</>
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
          title="Simpan Quotation sebagai Template"
        />
      </form>

      <ProductPicker
        isOpen={showProductPicker}
        onClose={() => setShowProductPicker(false)}
        onSelect={(product) => {
          handleSelectProduct(product, 0);
          setShowProductPicker(false);
          showToast(`${product.name} ditambahkan!`);
        }}
        products={products}
      />
    </>
  );
}