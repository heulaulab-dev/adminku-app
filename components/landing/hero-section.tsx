import Link from 'next/link';
import { MessageSquare, Zap, Clock } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary-light)] px-3 py-1 text-sm text-[var(--color-primary)]">
              <Zap className="h-4 w-4" />
              <span>Gratis untuk selamanya</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-[var(--color-text-primary)] md:text-5xl">
              WhatsApp Admin,{' '}
              <span className="text-[var(--color-primary)]">Tanpa Ribet.</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Bikin quotation, invoice, dan pesan profesional dalam hitungan detik.
              Tinggal copy, paste ke WhatsApp. Tanpa aplikasi baru.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app/compose"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--color-primary)] px-6 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
              >
                Mulai Gratis
              </Link>
              <Link
                href="#fitur"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-base font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg)]"
              >
                <MessageSquare className="h-5 w-5" />
                Lihat Fitur
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Dipakai 1000+ admin
              </span>
              <span className="flex items-center gap-1">
                ⭐ 4.9 rating
              </span>
            </div>
          </div>

          {/* Right: Demo visual */}
          <div className="relative">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--color-error)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--color-warning)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-[var(--color-bg)] p-3 text-sm">
                  <span className="font-medium">Pesan:</span>
                  <p className="mt-1 text-[var(--color-text-secondary)]">
                    Terima kasih atas ordernya! 🙏
                  </p>
                  <p className="mt-1 font-medium">
                    *Total: Rp 150.000*
                  </p>
                  <p className="mt-1 text-[var(--color-text-secondary)]">
                    • Transfer ke BCA 123456789 a/n TokoKu
                  </p>
                  <p className="mt-1 text-[var(--color-text-secondary)]">
                    • Pesanan dikirim H+1 setelah pembayaran
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                  <span className="text-sm text-[var(--color-text-muted)]">Preview WhatsApp</span>
                  <button className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white">
                    Salin
                  </button>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
