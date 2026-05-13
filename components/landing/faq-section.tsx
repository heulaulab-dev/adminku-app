'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'Apakah ini gratis?',
    a: 'Ya, fitur dasar gratis selamanya. Fitur premium akan datang untuk power users.',
  },
  {
    q: 'Apakah aman? Data saya di mana?',
    a: 'Semua data tersimpan di browser kamu. Kami tidak menyimpan pesan atau data pribadi kamu di server manapun.',
  },
  {
    q: 'Apakah bisa digunakan di HP?',
    a: 'Bisa! AdminKu dirancang untuk mobile-first. Buka di browser HP, berfungsi tanpa install aplikasi.',
  },
  {
    q: 'Apakah harus daftar/login?',
    a: 'Untuk fitur dasar, tidak perlu login. Untuk fitur template yang tersimpan, kamu bisa login dengan Google.',
  },
  {
    q: 'Apakah ini terhubung dengan WhatsApp?',
    a: 'Tidak. AdminKu adalah toolkit yang generate konten — kamu yang copy dan paste sendiri ke WhatsApp. Ini lebih aman dan fleksibel.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
            Pertanyaan yang sering ditanyain
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-[var(--color-border)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-[var(--color-text-primary)]">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-[var(--color-text-muted)] transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-[var(--color-text-secondary)]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
