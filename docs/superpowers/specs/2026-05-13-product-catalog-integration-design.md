# Product Catalog Integration - Design Spec

**Date:** 2026-05-13
**Feature:** Product Catalog Integration for Quotations/Invoices
**Status:** Approved

---

## Overview

Add "Pilih dari Katalog" functionality to quotation and invoice forms that allows:
1. Multi-select products from catalog
2. Optional customer auto-fill from database
3. Append selected products to existing items (not replace)

---

## Current State

- Product catalog exists at `/app/products` with CRUD operations
- Basic ProductPicker exists in `quotation-form.tsx` but only supports single selection
- Invoice form (`invoice-form.tsx`) has no product picker at all

---

## Features

### 1. Enhanced ProductPicker Modal

**Location:** `components/app/product-picker-modal.tsx` (new component)

**UI Elements:**
- Header with title "Pilih dari Katalog" and close button
- Search input with icon
- Product list with checkboxes (not radio buttons)
- Product card shows: name, category badge, price
- "X produk dipilih" counter badge
- Footer with "Batal" and "Tambah" buttons

**Behavior:**
- Checkbox toggles product selection
- Search filters by product name OR category
- "Tambah" button enabled only when >=1 product selected
- Clicking "Tambah" returns selected products array

### 2. Customer Dropdown (Optional)

**Location:** Inside ProductPicker modal or separate section

**UI Elements:**
- "Customer (opsional)" label
- Select dropdown with placeholder "Pilih customer..."
- "Tidak perlu" option as default
- When customer selected, show name as option text

**Behavior:**
- Pulls from existing `useCustomers()` hook
- Optional — if not selected, customer fields remain unchanged
- If selected, auto-fills: customerName, customerPhone, customerAddress

### 3. Quotation Form Integration

**File:** `components/app/quotation-form.tsx`

**Changes:**
1. Replace inline `ProductPicker` with new `ProductPickerModal` component
2. Update `handleSelectProduct` to accept array of products
3. When products added, `append()` multiple items (not replace)
4. Auto-fill customer if customer dropdown used

**New function:**
```typescript
const handleAddProducts = (products: Product[], customer?: Customer) => {
  // Append each product as new item
  products.forEach(product => {
    append({ id: Math.random().toString(), name: product.name, quantity: 1, price: product.price });
  });

  // Auto-fill customer if selected
  if (customer) {
    setValue('customerName', customer.name);
    setValue('customerPhone', customer.phone);
    setValue('customerAddress', customer.address || '');
  }
};
```

### 4. Invoice Form Integration

**File:** `components/app/invoice-form.tsx` (read first to understand structure)

**Changes:**
1. Add "Katalog" button similar to quotation form
2. Import and use `ProductPickerModal`
3. Implement same `handleAddProducts` pattern
4. Add customer dropdown to picker modal

---

## Component Structure

```
components/app/
├── product-picker-modal.tsx  (NEW)
├── quotation-form.tsx         (MODIFY - use new modal)
└── invoice-form.tsx           (MODIFY - add picker)
```

---

## Data Flow

```
User clicks "Pilih dari Katalog"
         ↓
ProductPickerModal opens
         ↓
User searches/scrolls products
User checks products (multi-select)
User optionally selects customer dropdown
         ↓
User clicks "Tambah"
         ↓
Parent receives: { products: Product[], customer?: Customer }
         ↓
Products → append() to items array
Customer → setValue() to form fields
         ↓
Modal closes, form updated
```

---

## Edge Cases

| Case | Handling |
|------|----------|
| Empty catalog | Show "Belum ada produk di katalog. Yuk tambah produk dulu!" with link to `/app/products` |
| No products found in search | Show "Produk tidak ditemukan" message |
| No customer selected | Customer fields unchanged |
| User clears customer after selecting | Reset to no customer |

---

## Implementation Order

1. Create `ProductPickerModal` component with multi-select
2. Add customer dropdown to modal
3. Update `quotation-form.tsx` to use new modal
4. Add product picker to `invoice-form.tsx`
5. Test full flow: open picker → select products → select customer → add → verify form populated

---

## Files to Modify

| File | Change |
|------|--------|
| `components/app/product-picker-modal.tsx` | Create new component |
| `components/app/quotation-form.tsx` | Use ProductPickerModal, update append logic |
| `components/app/invoice-form.tsx` | Add Katalog button and ProductPickerModal |

---

## Success Criteria

- [x] User can multi-select products from catalog
- [x] User can optionally select customer to auto-fill
- [x] Products append to existing items (not replace)
- [x] Both quotation and invoice forms support this
- [x] Empty catalog state shows helpful message
- [x] Search works for product name and category