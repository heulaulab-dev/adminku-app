import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="bg-[var(--color-primary)] py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Udah siap bikin admin WhatsApp jadi lebih gampang?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Mulai sekarang, gratis. Tidak ada kartu kredit diperlukan.
        </p>
        <div className="mt-8">
          <Link
            href="/app/compose"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-lg font-semibold text-[var(--color-primary)] transition-colors hover:bg-white/90"
          >
            Mulai Gratis Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
