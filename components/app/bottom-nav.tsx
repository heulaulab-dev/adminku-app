'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, FileText, Receipt, Bookmark, Truck, Bell, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/app/compose', label: 'Pesan', icon: MessageSquare },
  { href: '/app/quotes/new', label: 'Quote', icon: FileText },
  { href: '/app/invoices/new', label: 'Invoice', icon: Receipt },
  { href: '/app/shipping-confirmation', label: 'Kirim', icon: Truck },
  { href: '/app/order-recap', label: 'Recap', icon: ClipboardList },
  { href: '/app/payment-reminder', label: 'Reminder', icon: Bell },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/app/compose') {
      return pathname === '/app/compose' || pathname === '/app' || pathname === '/';
    }
    if (href.includes('/new')) {
      return pathname.startsWith(href.split('/new')[0]);
    }
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex h-16 items-center justify-around px-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-2 transition-colors',
                active
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}