'use client';

import Link from 'next/link';
import { MessageSquare, FileText, Receipt, Bookmark, Truck, Bell, ClipboardList, Users, Package } from 'lucide-react';
import { StatsDashboard } from '@/components/app/stats-dashboard';

const quickActions = [
  {
    href: '/app/compose',
    title: 'Format Pesan',
    description: 'Bikin pesan WhatsApp yang rapi',
    icon: MessageSquare,
    color: 'bg-[var(--color-primary)]',
  },
  {
    href: '/app/quotes/new',
    title: 'Buat Quotation',
    description: 'Kirim quotation profesional',
    icon: FileText,
    color: 'bg-[var(--color-secondary)]',
  },
  {
    href: '/app/invoices/new',
    title: 'Buat Invoice',
    description: 'Generate invoice lengkap',
    icon: Receipt,
    color: 'bg-[var(--color-info)]',
  },
  {
    href: '/app/shipping-confirmation',
    title: 'Shipping',
    description: 'Kirim notifikasi pengiriman',
    icon: Truck,
    color: 'bg-[var(--color-warning)]',
  },
  {
    href: '/app/order-recap',
    title: 'Order Recap',
    description: 'Ringkasan pesanan',
    icon: ClipboardList,
    color: 'bg-purple-500',
  },
  {
    href: '/app/payment-reminder',
    title: 'Payment Reminder',
    description: 'Pengingat pembayaran',
    icon: Bell,
    color: 'bg-orange-500',
  },
  {
    href: '/app/products',
    title: 'Produk',
    description: 'Katalog produk',
    icon: Package,
    color: 'bg-indigo-500',
  },
  {
    href: '/app/templates',
    title: 'Template',
    description: 'Template pesan kamu',
    icon: Bookmark,
    color: 'bg-pink-500',
  },
  {
    href: '/app/customers',
    title: 'Customer',
    description: 'Database customer',
    icon: Users,
    color: 'bg-cyan-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Halo! 👋
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          Mau bikin apa hari ini?
        </p>
      </div>

      {/* Stats Dashboard */}
      <StatsDashboard />

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">Menu</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 transition-all hover:border-[var(--color-primary)]/30 hover:shadow-sm"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.color} text-white`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--color-text-primary)]">{action.title}</p>
                <p className="truncate text-xs text-[var(--color-text-secondary)]">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary-light)] p-4">
        <p className="text-sm text-[var(--color-primary)]">
          💡 <strong>Tips:</strong> Simpan customer info biar nggak perlu ngetik ulang setiap bikin quotation.
        </p>
      </div>
    </div>
  );
}