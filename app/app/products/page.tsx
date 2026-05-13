'use client';

import { Package } from 'lucide-react';
import { useProducts } from '@/lib/store';
import { ProductList } from '@/components/app/product-list';
import { useToast } from '@/components/shared/toast';

export default function ProductsPage() {
  const { products, isLoaded, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showToast } = useToast();

  const handleSave = (data: { name: string; price: number; description: string; category: string }) => {
    addProduct(data);
    showToast('Produk berhasil disimpan!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white">
          <Package className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Produk</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {products.length > 0 ? `${products.length} produk` : 'Katalog produk kamu'}
          </p>
        </div>
      </div>

      <ProductList
        products={products}
        onEdit={(product) => {
          updateProduct(product.id, product);
          showToast('Produk berhasil diupdate!');
        }}
        onDelete={(id) => {
          if (window.confirm('Hapus produk ini?')) {
            deleteProduct(id);
            showToast('Produk berhasil dihapus!');
          }
        }}
        isLoaded={isLoaded}
        onAdd={handleSave}
      />
    </div>
  );
}