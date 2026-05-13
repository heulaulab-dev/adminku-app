'use client';

import { useState } from 'react';
import { Search, Package, Plus, MoreVertical, Trash2, Edit2, X } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatMoney } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; price: number; description: string; category: string }) => void;
  initialData?: Product | null;
  isEdit?: boolean;
}

function ProductModal({ isOpen, onClose, onSave, initialData, isEdit }: ProductModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim() && price) {
      onSave({
        name: name.trim(),
        price: parseInt(price) || 0,
        description,
        category,
      });
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
            <Package className="h-5 w-5 text-[var(--color-primary)]" />
            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Nama Produk *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Kaos Polos Hitam"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Harga *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Kategori</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Contoh: Pakaian, Accessories"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi produk (opsional)"
              rows={2}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !price}
            className={cn(
              'flex-1 rounded-lg py-2.5 text-sm font-medium text-white',
              name.trim() && price
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

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onSelect: (product: Product) => void;
  selectable?: boolean;
}

function ProductCard({ product, onEdit, onDelete, onSelect, selectable }: ProductCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:border-[var(--color-primary)]/30">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-[var(--color-text-primary)]">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--color-primary)]">{formatMoney(product.price)}</span>
            {product.category && (
              <span className="rounded-md bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
                {product.category}
              </span>
            )}
          </div>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-secondary)]">{product.description}</p>
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
                onClick={() => { onEdit(product); setShowMenu(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => { onDelete(product.id); setShowMenu(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
      {selectable && (
        <button
          onClick={() => onSelect(product)}
          className="mt-3 w-full rounded-lg bg-[var(--color-primary)] py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          Pilih
        </button>
      )}
    </div>
  );
}

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onSelect?: (product: Product) => void;
  onAdd?: (data: { name: string; price: number; description: string; category: string }) => void;
  isLoaded: boolean;
  selectable?: boolean;
}

export function ProductList({ products, onEdit, onDelete, onSelect, onAdd, isLoaded, selectable }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-10 pr-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12">
          <Package className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
          <p className="mb-2 font-medium text-[var(--color-text-primary)]">
            {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
          </p>
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
            {searchQuery ? 'Coba kata kunci lain' : 'Yuk tambah produk pertamamu'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => { setEditingProduct(null); setShowModal(true); }}
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
            >
              Tambah Produk
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelect || (() => {})}
              selectable={selectable}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingProduct(null); }}
        onSave={(data) => {
          if (editingProduct) {
            onEdit({ ...editingProduct, ...data });
          } else if (onAdd) {
            onAdd(data);
          }
        }}
        initialData={editingProduct}
        isEdit={!!editingProduct}
      />
    </div>
  );
}

export { ProductModal, ProductCard };