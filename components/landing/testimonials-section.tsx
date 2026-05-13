import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Indah S',
    role: 'Penjual Fashion Dropship',
    content: 'Sebelum pakai AdminKu, aku butuh 15 menit buat bikin quotation. Sekarang 1 menit. Worth it banget.',
  },
  {
    name: 'Andi R',
    role: 'Admin Toko Online',
    content: 'Sudah coba banyak template app, ini yang paling gampang. Langsung paham tanpa tutorial.',
  },
  {
    name: 'Rina M',
    role: 'Owner Catering Business',
    content: 'Pelangganku suka banget karena quotation kami keliatan professional. Sales naik 20% sejak pakai ini.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--color-bg)] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
            Dipakai sama orang kayak kamu
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                ))}
              </div>
              <p className="mb-4 text-[var(--color-text-secondary)]">"{testimonial.content}"</p>
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">{testimonial.name}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
