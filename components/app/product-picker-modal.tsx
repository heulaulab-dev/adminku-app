'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Package, X, ChevronDown, User } from 'lucide-react';
import { useProducts, useCustomers } from '@/lib/store';
import { formatMoney } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { Product, Customer } from '@/lib/types';

interface ProductPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (products: Product[], customer?: Customer) => void;
}

export function ProductPickerModal({ isOpen, onClose, onAdd }: ProductPickerModalProps) {
  const { products, isLoaded } = useProducts();
  const { customers } = useCustomers();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedProductIds(new Set());
      setSelectedCustomerId('');
      setShowCustomerDropdown(false);
    }
  }, [isOpen]);

  // Filter products by name or category
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  // Toggle product selection
  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // Get selected products
  const selectedProducts = products.filter((p) => selectedProductIds.has(p.id));

  // Handle customer selection
  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShowCustomerDropdown(false);
  };

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  // Handle add
  const handleAdd = () => {
    onAdd(selectedProducts, selectedCustomer);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-[var(--color-surface)] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Pilih dari Katalog
            </h2>
            {selectedProductIds.size > 0 && (
              <span className="rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-xs font-medium text-white">
                {selectedProductIds.size} dipilih
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-[var(--color-border)] px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk atau kategori..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] py-2 pl-10 pr-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
          </div>
        </div>

        {/* Customer Dropdown */}
        <div className="border-b border-[var(--color-border)] px-4 py-3">
          <div className="relative">
            <button
              onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
              className="flex w-full items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-left text-[var(--color-text-primary)] hover:border-[var(--color-primary)]/50"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--color-text-muted)]" />
                {selectedCustomer ? (
                  <span>{selectedCustomer.name}</span>
                ) : (
                  <span className="text-[var(--color-text-muted)]">
                    Tidak perlu (opsional)
                  </span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)]" />
            </button>

            {showCustomerDropdown && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
                <button
                  onClick={() => handleCustomerSelect('')}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]"
                >
                  Tidak perlu
                </button>
                {customers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => handleCustomerSelect(customer.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
                  >
                    {customer.name}
                    {customer.phone && (
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {customer.phone}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-auto px-4 py-3">
          {!isLoaded ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="mb-3 h-12 w-12 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-secondary)]">
                Belum ada produk di katalog.
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Yuk tambah produk dulu di halaman Produk
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="mb-3 h-12 w-12 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-secondary)]">
                Produk tidak ditemukan
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product) => {
                const isSelected = selectedProductIds.has(product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all',
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                        : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-primary)]/50'
                    )}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                          : 'border-[var(--color-text-muted)]'
                      )}
                    >
                      {isSelected && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[var(--color-text-primary)]">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {product.category && (
                          <span className="inline-block rounded bg-[var(--color-primary)]/20 px-1.5 py-0.5 text-xs text-[var(--color-primary)]">
                            {product.category}
                          </span>
                        )}
                        <span className="text-sm font-medium text-[var(--color-primary)]">
                          {formatMoney(product.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[var(--color-border)] px-4 py-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
          >
            Batal
          </button>
          <button
            onClick={handleAdd}
            disabled={selectedProductIds.size === 0}
            className={cn(
              'flex-1 rounded-lg py-2.5 text-sm font-medium text-white transition-colors',
              selectedProductIds.size > 0
                ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
                : 'bg-[var(--color-text-muted)] cursor-not-allowed'
            )}
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}