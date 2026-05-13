import { InvoiceForm } from '@/components/app/invoice-form';
import { Receipt } from 'lucide-react';

export default function NewInvoicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-info)] text-white">
          <Receipt className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Invoice Baru</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Generate invoice profesional</p>
        </div>
      </div>

      <InvoiceForm />
    </div>
  );
}