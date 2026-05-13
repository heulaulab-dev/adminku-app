import { PaymentReminderForm } from '@/components/app/payment-reminder-form';
import { Bell } from 'lucide-react';

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-white">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Payment Reminder</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Kirim pengingat pembayaran ke customer</p>
        </div>
      </div>

      <PaymentReminderForm />
    </div>
  );
}