'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Gratis',
    price: 'Rp 0',
    period: '/bulan',
    description: 'Untuk yang baru mulai',
    features: [
      'Unlimited Message Formatter',
      '10 Quotation/bulan',
      '5 Invoice/bulan',
      '20 Templates',
      'Copy ke WhatsApp',
    ],
    cta: 'Mulai Gratis',
    highlight: false,
  },
  {
    name: 'Starter',
    price: 'Rp 99rb',
    period: '/bulan',
    description: 'Untuk yang serius jualan',
    features: [
      'Unlimited Message Formatter',
      '50 Quotation/bulan',
      '25 Invoice/bulan',
      '100 Templates',
      '50 Customer database',
      '20 PDF export/bulan',
      'Priority support',
    ],
    cta: 'Upgrade ke Starter',
    highlight: true,
  },
  {
    name: 'Pro',
    price: 'Rp 199rb',
    period: '/bulan',
    description: 'Untuk bisnis yang grows',
    features: [
      'Unlimited Message Formatter',
      'Unlimited Quotations',
      'Unlimited Invoices',
      'Unlimited Templates',
      'Unlimited Customer database',
      'Unlimited PDF export',
      'Unlimited Order Recap',
      'Priority support',
    ],
    cta: 'Upgrade ke Pro',
    highlight: false,
  },
];

const yearlyPlans = [
  {
    name: 'Starter Yearly',
    price: 'Rp 950rb',
    period: '/tahun',
    savings: 'Hemat 20%',
    highlight: false,
  },
  {
    name: 'Pro Yearly',
    price: 'Rp 1.99jt',
    period: '/tahun',
    savings: 'Hemat 20%',
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">AdminKu</span>
          </Link>
          <Link
            href="/app/compose"
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
          >
            Coba Gratis
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] md:text-5xl">
            Harga yang pas untuk bisnis kamu
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Mulai gratis, upgrade kapan aja. Tidak ada kartu kredit diperlukan.
          </p>
        </div>
      </section>

      {/* Monthly Plans */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl border p-6 md:p-8',
                  plan.highlight
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] shadow-lg'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                    Populer
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={cn(
                    'text-lg font-semibold',
                    plan.highlight ? 'text-white' : 'text-[var(--color-text-primary)]'
                  )}>
                    {plan.name}
                  </h3>
                  <p className={cn(
                    'mt-1 text-sm',
                    plan.highlight ? 'text-white/80' : 'text-[var(--color-text-secondary)]'
                  )}>
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className={cn(
                    'text-3xl font-bold',
                    plan.highlight ? 'text-white' : 'text-[var(--color-text-primary)]'
                  )}>
                    {plan.price}
                  </span>
                  <span className={cn(
                    'text-sm',
                    plan.highlight ? 'text-white/80' : 'text-[var(--color-text-muted)]'
                  )}>
                    {plan.period}
                  </span>
                </div>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        plan.highlight ? 'text-white' : 'text-[var(--color-success)]'
                      )} />
                      <span className={cn(
                        'text-sm',
                        plan.highlight ? 'text-white/90' : 'text-[var(--color-text-secondary)]'
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    'w-full rounded-xl py-3 text-sm font-semibold transition-colors',
                    plan.highlight
                      ? 'bg-white text-[var(--color-primary)] hover:bg-white/90'
                      : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yearly Plans */}
      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">
              Atau pilih tahunan, hemat 20%
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Kalo batal, 7 hari money back guarantee
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:px-8">
            {yearlyPlans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-xl border p-6',
                  plan.highlight
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {plan.savings}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[var(--color-text-primary)]">
                      {plan.price}
                    </div>
                    <div className="text-sm text-[var(--color-text-muted)]">
                      {plan.period}
                    </div>
                  </div>
                </div>
                <button
                  className={cn(
                    'mt-4 w-full rounded-lg py-2 text-sm font-medium transition-colors',
                    plan.highlight
                      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
                      : 'border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]'
                  )}
                >
                  Pilih {plan.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            Pertanyaan yang sering ditanyain
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Kapan saya akan dikenakan biaya?',
                a: 'Plan gratis gratis selamanya. Kamu hanya dikenakan biaya jika memilih upgrade ke Starter atau Pro.',
              },
              {
                q: 'Apakah bisa cancel kapan aja?',
                a: 'Ya, bisa cancel kapan aja. Data kamu tetap tersimpan dan bisa di-export.',
              },
              {
                q: 'Metode pembayaran apa saja yang didukung?',
                a: 'Saat ini mendukung GoPay, OVO, Dana, Bank Transfer, dan kartu kredit.',
              },
              {
                q: 'Apakah ada trial?',
                a: 'Plan gratis sudah merupakan trial unlimited. Upgrade kalau udah yakin mau lebih.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
              >
                <h3 className="font-medium text-[var(--color-text-primary)]">{faq.q}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-primary)] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Masih ragu?
          </h2>
          <p className="mt-2 text-white/80">
            Mulai dengan plan gratis dulu, upgrade kalau sudah cocok.
          </p>
          <Link
            href="/app/compose"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-[var(--color-primary)] hover:bg-white/90"
          >
            Mulai Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-[var(--color-text-muted)]">
          <p>&copy; 2026 AdminKu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}