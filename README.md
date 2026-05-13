# AdminKu

WhatsApp Admin Toolkit untuk bisnis online Indonesia.

**Bosen ngetik pesan WhatsApp yang sama terus?** AdminKu bantu kamu format pesan, bikin quotation, invoice, dan masih banyak lagi — tinggal copy paste ke WhatsApp.

## Fitur

### Core Features
- **Message Formatter** — Format teks dengan bold, italic, strikethrough, bullet
- **Quotation Generator** — Bikin quotation profesional dalam detik, simpan sebagai template, lihat history
- **Invoice Generator** — Auto invoice number + berbagai metode pembayaran, export PDF
- **Order Recap** — Ringkasan pesanan untuk customer
- **Payment Reminder** — Pengingat pembayaran otomatis
- **Shipping Confirmation** — Format konfirmasi pengiriman
- **Customer Database** — Simpan data customer, reuse di mana-mana

### Template System
- Save hasil generate sebagai template
- 5 default templates siap pakai
- Edit, hapus, cari template
- Filter berdasarkan kategori: Semua, Salam, Pembayaran, Pengiriman, Penutup

### Export & Share
- Copy to clipboard
- Share langsung ke WhatsApp (Web Share API)
- Export PDF (html2canvas + jsPDF)

### Auth & Dashboard
- Login dengan Google OAuth
- Usage stats dengan streak tracking
- History quotation & invoice

### UI/UX
- Dark mode toggle
- Mobile-first responsive design
- Bottom navigation
- Toast notifications

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Auth**: NextAuth.js v5 (Google OAuth)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Storage**: localStorage (frontend)
- **PDF**: html2canvas + jsPDF
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

# Copy environment file
cp .env.local.example .env.local

# Add your environment variables
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
# NEXTAUTH_URL=http://localhost:3000

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start.

## Project Structure

```
apps/web/
├── app/
│   ├── (auth)/          # Auth pages (login)
│   ├── api/
│   │   └── auth/        # NextAuth API routes
│   ├── app/             # Dashboard pages
│   │   ├── compose/     # Message formatter
│   │   ├── customers/   # Customer database
│   │   ├── invoices/     # Invoice list & generator
│   │   ├── order-recap/ # Order recap generator
│   │   ├── payment-reminder/
│   │   ├── quotes/      # Quotation list & generator
│   │   ├── shipping-confirmation/
│   │   ├── stats/       # Usage stats dashboard
│   │   └── templates/  # Template library
│   ├── pricing/         # Pricing page
│   └── page.tsx         # Landing page
├── components/
│   ├── app/             # Dashboard components
│   ├── landing/         # Landing page components
│   └── shared/          # Shared UI (toast, modal, nav)
└── lib/
    ├── constants.ts     # App constants
    ├── formatters.ts    # Text formatting utilities
    ├── schemas.ts       # Zod validation schemas
    ├── store.ts         # localStorage state management
    ├── types.ts         # TypeScript types
    └── utils.ts         # Utility functions
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
| `/` | Landing page with hero, features, FAQ |
| `/login` | Login with Google OAuth |
| `/pricing` | Pricing page with 3 tiers |
| `/app` | Dashboard home |
| `/app/compose` | Message formatter |
| `/app/quotes` | Quotations list with history |
| `/app/quotes/new` | New quotation |
| `/app/invoices` | Invoices list with history |
| `/app/invoices/new` | New invoice |
| `/app/order-recap` | Order recap generator |
| `/app/payment-reminder` | Payment reminder generator |
| `/app/shipping-confirmation` | Shipping confirmation |
| `/app/customers` | Customer database |
| `/app/templates` | Template library |
| `/app/stats` | Usage stats dashboard |

## Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

```bash
# Deploy to Vercel
cd apps/web
vercel deploy --prod
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## License

MIT

---

Built with for Indonesian online sellers.