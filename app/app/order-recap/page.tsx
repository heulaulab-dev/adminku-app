import { OrderRecapForm } from '@/components/app/order-recap-form';
import { ClipboardList } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-info)] text-white">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Order Recap</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Kirim ringkasan pesanan ke customer</p>
        </div>
      </div>

      <OrderRecapForm />
    </div>
  );
}