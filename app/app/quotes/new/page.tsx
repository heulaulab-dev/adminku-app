import { QuotationForm } from '@/components/app/quotation-form';
import { FileText } from 'lucide-react';

export default function NewQuotePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Quotation Baru</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Buat quotation profesional</p>
        </div>
      </div>

      <QuotationForm />
    </div>
  );
}