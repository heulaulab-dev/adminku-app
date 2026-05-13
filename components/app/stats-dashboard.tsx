'use client';

import { Flame, FileText, Receipt, Bookmark2 } from 'lucide-react';
import { useUsageStats } from '@/lib/store';
import { cn } from '@/lib/utils';

export function StatsDashboard() {
  const { stats, isLoaded } = useUsageStats();

  if (!isLoaded) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-[var(--color-surface)]" />
        ))}
      </div>
    );
  }

  const hasActivity = stats.totalQuotations > 0 || stats.totalInvoices > 0 || stats.totalTemplates > 0;

  if (!hasActivity) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="rounded-full bg-[var(--color-primary)]/10 p-3">
            <Flame className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
        </div>
        <p className="font-medium text-[var(--color-text-primary)]">Mulai gunakan AdminKu!</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Aktivitasmu akan muncul di sini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Streak Banner */}
      {stats.currentStreak > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              stats.currentStreak >= 7 ? 'bg-[var(--color-warning)]/20' : 'bg-[var(--color-primary)]/20'
            )}>
              <Flame className={cn(
                'h-5 w-5',
                stats.currentStreak >= 7 ? 'text-[var(--color-warning)]' : 'text-[var(--color-primary)]'
              )} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">Streak kamu</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {stats.currentStreak} hari
              </p>
            </div>
          </div>
          {stats.currentStreak >= 7 && (
            <span className="rounded-full bg-[var(--color-warning)]/20 px-3 py-1 text-xs font-medium text-[var(--color-warning)]">
              Keren! 🔥
            </span>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FileText className="h-5 w-5 text-[var(--color-primary)]" />}
          label="Quotation"
          value={stats.totalQuotations}
          bgColor="bg-[var(--color-primary)]/10"
        />
        <StatCard
          icon={<Receipt className="h-5 w-5 text-[var(--color-secondary)]" />}
          label="Invoice"
          value={stats.totalInvoices}
          bgColor="bg-[var(--color-secondary)]/10"
        />
        <StatCard
          icon={<Bookmark2 className="h-5 w-5 text-[var(--color-info)]" />}
          label="Templates"
          value={stats.totalTemplates}
          bgColor="bg-[var(--color-info)]/10"
        />
      </div>

      {/* Streak Info */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Flame className="h-4 w-4" />
          Streak terbaik
        </div>
        <span className="font-medium text-[var(--color-text-primary)]">
          {stats.longestStreak} hari
        </span>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
}

function StatCard({ icon, label, value, bgColor }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center gap-3">
        <div className={cn('rounded-lg p-2', bgColor)}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        </div>
      </div>
    </div>
  );
}