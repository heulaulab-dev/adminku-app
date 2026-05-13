import { CustomerList } from '@/components/app/customer-list';
import { Users } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-info)] text-white">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Customer</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Database customer kamu</p>
        </div>
      </div>

      <CustomerList />
    </div>
  );
}