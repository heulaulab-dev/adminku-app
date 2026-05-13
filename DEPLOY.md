# Deploy AdminKu to Vercel

## Prerequisites
1. Vercel account (free tier works)
2. Google OAuth app credentials
3. Node.js 20+

## Setup

### 1. Create Google OAuth App
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. APIs & Services > Credentials
4. Create OAuth Client ID (Web application)
5. Add authorized redirect URI: `https://your-domain.com/api/auth/callback/google`

### 2. Install Vercel CLI (optional)

```bash
npm i -g vercel
vercel login
```

### 3. Deploy to Vercel

```bash
# Navigate to web app
cd adminku/apps/web

# Deploy to preview
vercel deploy

# Deploy to production
vercel deploy --prod
```

Or use Vercel dashboard:
1. Import project from GitHub
2. Set root directory to `apps/web`
3. Deploy

### 4. Set Environment Variables
In Vercel dashboard > Settings > Environment Variables:

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=generate_with_openssl_rand_base64(32)
NEXTAUTH_URL=https://your-domain.com
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 5. Custom Domain (Optional)
Add custom domain in Vercel dashboard > Settings > Domains

## Post-Deployment Checklist

### Auth Testing
- [ ] Test Google login
- [ ] Verify session persists
- [ ] Test logout functionality

### Core Features
- [ ] Message formatter at `/app/compose`
- [ ] Quotation generator at `/app/quotes/new`
- [ ] Invoice generator at `/app/invoices/new`
- [ ] Template library at `/app/templates`
- [ ] Customer database at `/app/customers`
- [ ] Order recap at `/app/order-recap`
- [ ] Payment reminder at `/app/payment-reminder`
- [ ] Shipping confirmation at `/app/shipping-confirmation`

### UI/UX
- [ ] Verify mobile responsiveness
- [ ] Test dark mode toggle
- [ ] Check toast notifications
- [ ] Test WhatsApp share functionality

### Technical
- [ ] Check browser console for errors
- [ ] Verify localStorage persistence
- [ ] Test PDF export (if available)

## Project Structure

```
adminku/
├── apps/
│   └── web/           # Next.js app (deploy this)
│       ├── app/       # App Router pages
│       ├── components/# React components
│       ├── lib/       # Utilities, types, constants
│       └── public/    # Static assets
└── package.json
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Auth**: NextAuth.js v5 (Google OAuth)
- **Validation**: Zod
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **PDF**: html2canvas + jsPDF
- **Deployment**: Vercel

## Features

### Core Generators
- WhatsApp message formatter with markdown support (bold, italic, strikethrough)
- Quotation generator with auto-calculation and history
- Invoice generator with auto-numbering and PDF export
- Order recap generator
- Payment reminder generator
- Shipping confirmation generator

### Templates
- Template library with localStorage persistence
- 5 default starter templates
- Save generated documents as templates
- Category-based filtering

### Data Management
- Customer database with CRUD operations
- Document history (quotations, invoices)
- Usage stats with streak tracking

### Export & Sharing
- Copy to clipboard
- Share to WhatsApp (Web Share API)
- PDF export (html2canvas + jsPDF)

### UI/UX
- Mobile-first responsive design
- Bottom navigation
- Dark mode toggle
- Toast notifications
- Loading states

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth sessions | Yes |
| `NEXTAUTH_URL` | Application URL (e.g., https://adminku.vercel.app) | Yes |

## Troubleshooting

### Google OAuth Not Working
- Verify redirect URI in Google Cloud Console matches exactly
- Check NEXTAUTH_URL is set correctly (no trailing slash)

### Session Issues
- Ensure NEXTAUTH_SECRET is set
- Clear browser cookies and try again

### Build Failures
- Check Node.js version (20+ required)
- Verify all environment variables are set
- Check build logs in Vercel dashboard