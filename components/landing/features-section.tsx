import { MessageSquare, FileText, Receipt, Bookmark } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Format Pesan Instan',
    description: 'Ketik pesan panjang tetap rapi. Bold, daftar, harga — semua otomatis diformat buat WhatsApp.',
  },
  {
    icon: FileText,
    title: 'Kirim Quotation dalam Detik',
    description: 'Input produk, jumlah, harga. Dapat quotation profesional siap kirim via WhatsApp.',
  },
  {
    icon: Receipt,
    title: 'Invoice Bersih Tanpa Excel',
    description: 'Generate invoice lengkap dengan nomor urut otomatis. Export PDF atau langsung kirim.',
  },
  {
    icon: Bookmark,
    title: 'Template yang Kamu Pakai',
    description: 'Simpan template yang sering kamu pake. Satu tap untuk pakai, satu tap untuk copy.',
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="bg-[var(--color-surface)] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
            Semua yang kamu butuhkan, bukan semua yang kamu tidak pakai
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Fokus sama yang bikin kamu lebih cepet, bukan yang bikin ribet.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition-all hover:border-[var(--color-primary)]/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
