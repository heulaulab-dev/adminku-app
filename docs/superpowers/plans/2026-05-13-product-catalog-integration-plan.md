# Product Catalog Integration - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable multi-select product picking from catalog with optional customer auto-fill in quotation and invoice forms, appending selected products to existing items.

**Architecture:** Create a reusable `ProductPickerModal` component with multi-select checkboxes and customer dropdown, then integrate it into both `quotation-form.tsx` and `invoice-form.tsx`.

**Tech Stack:** React 19, TypeScript, React Hook Form, Lucide icons

---

## File Structure

| Action | File |
|--------|------|
| Create | `components/app/product-picker-modal.tsx` |
| Modify | `components/app/quotation-form.tsx` |
| Modify | `components/app/invoice-form.tsx` |

---

## Task 1: Create ProductPickerModal Component

**Files:**
- Create: `components/app/product-picker-modal.tsx`

- [ ] **Step 1: Create the ProductPickerModal component**

```tsx
'use client';

import { useState } from 'react';
import { Search, Package, X, ChevronDown, User } from 'lucide-react';
import type { Product, Customer } from '@/lib/types';
import { useProducts, useCustomers } from '@/lib/store';
import { formatMoney } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface ProductPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (products: Product[], customer?: Customer) => void;
}

export function ProductPickerModal({ isOpen, onClose, onAdd }: ProductPickerModalProps) {
  const { products, isLoaded } = useProducts();
  const { customers } = useCustomers();
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  if (!isOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedProducts = products.filter((p) => selectedIds.has(p.id));
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  const toggleProduct = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleAdd = () => {
    onAdd(selectedProducts, selectedCustomer);
    // Reset state
    setSelectedIds(new Set());
    setSelectedCustomerId('');
    setSearch('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-[var(--color-surface)] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <h2 className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
            <Package className="h-5 w-5 text-[var(--color-primary)]" />
            Pilih dari Katalog
            {selectedIds.size > 0 && (
              <span className="rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-xs font-medium text-white">
                {selectedIds.size}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-[var(--color-border)] p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] py-2.5 pl-10 pr-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Customer Dropdown (Optional) */}
        <div className="border-b border-[var(--color-border)] p-4">
          <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <User className="h-4 w-4" />
            Customer (opsional)
          </label>
          <div className="relative">
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 pr-10 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
            >
              <option value="">Tidak perlu</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4">
          {!isLoaded ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Package className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
              <p className="text-center font-medium text-[var(--color-text-primary)]">
                {search ? 'Produk tidak ditemukan' : 'Belum ada produk di katalog'}
              </p>
              <p className="mt-1 text-center text-sm text-[var(--color-text-secondary)]">
                {search ? 'Coba kata kunci lain' : 'Yuk tambah produk dulu di halaman Produk'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product) => {
                const isSelected = selectedIds.has(product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30'
                    )}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded border',
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                          : 'border-[var(--color-text-muted)]'
                      )}
                    >
                      {isSelected && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {/* Product Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[var(--color-text-primary)]">{product.name}</p>
                      {product.category && (
                        <p className="text-xs text-[var(--color-text-muted)]">{product.category}</p>
                      )}
                    </div>
                    {/* Price */}
                    <span className="font-semibold text-[var(--color-primary)]">
                      {formatMoney(product.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[var(--color-border)] p-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
          >
            Batal
          </button>
          <button
            onClick={handleAdd}
            disabled={selectedIds.size === 0}
            className={cn(
              'flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors',
              selectedIds.size > 0
                ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
                : 'bg-[var(--color-text-muted)] text-white cursor-not-allowed'
            )}
          >
            {selectedIds.size > 0 ? `Tambah ${selectedIds.size} Produk` : 'Pilih Produk'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify component has no syntax errors**

Run: `npx tsc --noEmit components/app/product-picker-modal.tsx` (or check in IDE)
Expected: No errors

---

## Task 2: Update QuotationForm to Use ProductPickerModal

**Files:**
- Modify: `components/app/quotation-form.tsx`

- [ ] **Step 1: Update imports and replace inline ProductPicker**

Replace the inline `ProductPicker` component and its usage with the new `ProductPickerModal`. Update `handleSelectProduct` to handle multiple products and optional customer.

**Changes:**
1. Remove inline `ProductPicker` component (lines 15-91)
2. Import `ProductPickerModal` instead
3. Import `useCustomers` hook
4. Add `showProductPicker` state toggle
5. Update `handleAddProducts` function to:
   - Append each selected product to items array
   - Auto-fill customer fields if customer selected

```tsx
// In imports, change from:
import { useProducts } from '@/lib/store';
// to:
import { useProducts, useCustomers } from '@/lib/store';

// Remove the inline ProductPicker function (lines 15-91)
// Add this near other state declarations:
const [showProductPicker, setShowProductPicker] = useState(false);
const { customers } = useCustomers();

// Replace handleSelectProduct with handleAddProducts:
const handleAddProducts = (products: Product[], customer?: Customer) => {
  // Append each product as new item
  products.forEach((product) => {
    append({ id: Math.random().toString(), name: product.name, quantity: 1, price: product.price });
  });

  // Auto-fill customer if selected
  if (customer) {
    setValue('customerName', customer.name);
    setValue('customerPhone', customer.phone);
    setValue('customerAddress', customer.address || '');
  }

  showToast(`${products.length} produk ditambahkan!`);
};
```

- [ ] **Step 2: Update "Katalog" button to open modal**

In the Items section header (around line 224), change the button onClick:

```tsx
// Change from:
onClick={() => setShowProductPicker(true)}

// Keep the button, just change handler:
// The existing button structure is fine, just ensure it opens the modal
```

- [ ] **Step 3: Replace ProductPicker with ProductPickerModal**

Replace the `ProductPicker` component at the bottom (around line 379-388) with:

```tsx
<ProductPickerModal
  isOpen={showProductPicker}
  onClose={() => setShowProductPicker(false)}
  onAdd={handleAddProducts}
/>
```

- [ ] **Step 4: Verify build**

Run: `npm run build` or `next build`
Expected: No errors

---

## Task 3: Add Product Picker to InvoiceForm

**Files:**
- Modify: `components/app/invoice-form.tsx`

- [ ] **Step 1: Update imports**

Add to existing imports:
```tsx
import { Plus, Trash2, Copy, Share2, Check, Bookmark, Package } from 'lucide-react';
import { useProducts, useCustomers } from '@/lib/store';
import { ProductPickerModal } from './product-picker-modal';
import type { Product, Customer } from '@/lib/types';
```

- [ ] **Step 2: Add state and hooks**

Add after existing state declarations (around line 19):
```tsx
const [showProductPicker, setShowProductPicker] = useState(false);
const { products } = useProducts();
const { customers } = useCustomers();
```

Add `setValue` to useForm destructuring (around line 27-32):
```tsx
const {
  register,
  control,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm<InvoiceInput>({...});
```

- [ ] **Step 3: Add handleAddProducts function**

Add after `handleShare` function (around line 95):
```tsx
const handleAddProducts = (items: Product[], customer?: Customer) => {
  // Append each product as new item
  items.forEach((product) => {
    append({ id: Math.random().toString(), name: product.name, quantity: 1, price: product.price });
  });

  // Auto-fill customer if selected
  if (customer) {
    setValue('customerName', customer.name);
    setValue('customerPhone', customer.phone);
  }

  showToast(`${items.length} produk ditambahkan!`);
};
```

- [ ] **Step 4: Add Katalog button to Items section**

In the Items section header (around line 137-146), update:

```tsx
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
```

- [ ] **Step 5: Add ProductPickerModal before closing form tag**

Add before the closing `</form>` tag (around line 305):
```tsx
<ProductPickerModal
  isOpen={showProductPicker}
  onClose={() => setShowProductPicker(false)}
  onAdd={handleAddProducts}
/>
```

- [ ] **Step 6: Verify build**

Run: `npm run build` or `next build`
Expected: No errors

---

## Task 4: Test Full Flow

**Files:**
- Test: Manual testing in browser

- [ ] **Step 1: Start dev server and navigate to quotation form**

Run: `npm run dev`
Open: `http://localhost:3000/app/quotes/new`

- [ ] **Step 2: Add products to catalog first**

1. Navigate to `/app/products`
2. Add 3-4 test products with names, prices, categories

- [ ] **Step 3: Test product picker in quotation form**

1. Go back to `/app/quotes/new`
2. Click "Katalog" button
3. Modal should open with product list
4. Select 2-3 products via checkboxes
5. Optionally select a customer from dropdown
6. Click "Tambah X Produk"
7. Verify:
   - Items added to form with correct names and prices
   - Customer info auto-filled if customer selected
   - Items appended (not replaced existing items)

- [ ] **Step 4: Test product picker in invoice form**

1. Navigate to `/app/invoices/new`
2. Click "Katalog" button
3. Select products
4. Click "Tambah X Produk"
5. Verify same behavior as quotation form

- [ ] **Step 5: Verify edge cases**

1. Empty catalog → Show helpful message
2. No products selected → "Tambah" button disabled
3. Search filter → Products filtered correctly
4. Customer not selected → Customer fields unchanged

---

## Success Criteria

- [ ] ProductPickerModal component created with multi-select checkboxes
- [ ] Customer dropdown in modal allows optional auto-fill
- [ ] Quotation form uses ProductPickerModal with append behavior
- [ ] Invoice form uses ProductPickerModal with append behavior
- [ ] Empty catalog state shows helpful message
- [ ] Search filters products by name or category
- [ ] Build passes without errors

---

## Notes

- Both forms use `useFieldArray` from react-hook-form for dynamic items
- Products append using `append()` method - does not replace existing items
- Customer auto-fill only happens when customer is explicitly selected
- The modal is reusable across both quotation and invoice forms