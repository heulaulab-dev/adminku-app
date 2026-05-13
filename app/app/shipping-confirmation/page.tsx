import { ShippingForm } from '@/components/app/shipping-form';
import { Truck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-warning)] text-white">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Shipping Confirmation</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Kirim notifikasi pengiriman ke customer</p>
        </div>
      </div>

      <ShippingForm />
    </div>
  );
}