# AdminKu

WhatsApp Admin Toolkit untuk bisnis online Indonesia.

<img src="https://img.shields.io/badge/version-0.3.0-blue.svg" alt="version">

**Bosen ngetik pesan WhatsApp yang sama terus?** AdminKu bantu kamu format pesan, bikin quotation, invoice, dan masih banyak lagi — tinggal copy paste ke WhatsApp.

## Fitur

### Core Features
- **Message Formatter** — Format teks dengan bold, italic, strikethrough, bullet
- **Quotation Generator** — Bikin quotation profesional dalam detik
- **Invoice Generator** — Auto invoice number + berbagai metode pembayaran
- **Order Recap** — Ringkasan pesanan untuk customer
- **Payment Reminder** — Pengingat pembayaran otomatis
- **Shipping Confirmation** — Format konfirmasi pengiriman
- **Customer Database** — Simpan data customer, reuse di mana-mana

### Template System
- Save hasil generate sebagai template
- 5 default templates siap pakai
- Edit, hapus, cari template

### Export & Share
- Copy to clipboard
- Share langsung ke WhatsApp
- Export PDF

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Auth**: NextAuth.js v5 (Google OAuth)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Storage**: localStorage (frontend) + Neon Postgres (planned)
- **Deployment**: Vercel

## Quick Start

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone repository
git clone https://github.com/heulaulab/adminku.git
cd adminku/apps/web

# Install dependencies
npm install
# or
bun install

# Copy environment file
cp .env.local.example .env.local

# Add your environment variables
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start.

## Project Structure

```
apps/web/
├── app/
│   ├── (auth)/          # Auth pages (login)
│   ├── api/auth/        # NextAuth API routes
│   ├── app/             # Dashboard pages
│   │   ├── compose/     # Message formatter
│   │   ├── customers/    # Customer database
│   │   ├── invoices/     # Invoice generator
│   │   ├── order-recap/  # Order recap
│   │   ├── payment-reminder/
│   │   ├── quotes/       # Quotation generator
│   │   ├── shipping-confirmation/
│   │   └── templates/    # Template library
│   └── page.tsx         # Landing page
├── components/
│   ├── app/             # Dashboard components
│   ├── landing/         # Landing page components
│   └── shared/          # Shared UI (toast, modal)
└── lib/
    ├── constants.ts      # App constants
    ├── formatters.ts     # Text formatting utilities
    ├── schemas.ts        # Zod validation schemas
    ├── store.ts          # localStorage state (templates, customers)
    ├── types.ts          # TypeScript types
    └── utils.ts          # Utility functions
```

## Environment Variables

```env
# Google OAuth (required for auth)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# NextAuth (required)
NEXTAUTH_SECRET=generate_with_openssl_rand_base64(32)
NEXTAUTH_URL=http://localhost:3000
```

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. APIs & Services > Credentials
4. Create OAuth Client ID (Web application)
5. Add authorized redirect: `https://your-domain.com/api/auth/callback/google`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Login with Google |
| `/app` | Dashboard |
| `/app/compose` | Message formatter |
| `/app/quotes` | Quotations list |
| `/app/quotes/new` | New quotation |
| `/app/invoices` | Invoices list |
| `/app/invoices/new` | New invoice |
| `/app/order-recap` | Order recap generator |
| `/app/payment-reminder` | Payment reminder generator |
| `/app/shipping-confirmation` | Shipping confirmation |
| `/app/customers` | Customer database |
| `/app/templates` | Template library |

## Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

```bash
# Deploy to Vercel
cd apps/web
vercel deploy --prod
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

---

Built with for Indonesian online sellers.