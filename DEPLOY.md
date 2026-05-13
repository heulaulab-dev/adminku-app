# Deploy AdminKu to Vercel

## Prerequisites
1. Vercel account (free tier works)
2. Google OAuth app credentials

## Setup

### 1. Create Google OAuth App
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. APIs & Services > Credentials
4. Create OAuth Client ID (Web application)
5. Add authorized redirect URI: `https://your-domain.com/api/auth/callback/google`

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd adminku/apps/web
vercel deploy --prod
```

### 3. Set Environment Variables
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

### 4. Custom Domain (Optional)
Add custom domain in Vercel dashboard > Settings > Domains

## Post-Deployment Checklist
- [ ] Test Google login
- [ ] Test message formatter at /compose
- [ ] Test quotation generator at /quotes/new
- [ ] Test invoice generator at /invoices/new
- [ ] Test template library at /templates
- [ ] Verify mobile responsiveness
- [ ] Check console for errors

## Project Structure
```
adminku/
└── apps/
    └── web/           # Next.js 15 app (this is what you deploy)
        ├── app/       # App Router pages
        ├── components/# React components
        ├── lib/       # Utilities, types, constants
        └── hooks/     # Custom React hooks
```

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js v5 (Google OAuth)
- Vercel deployment

## Features
- WhatsApp message formatter with markdown support
- Quotation generator with auto-calculation
- Invoice generator with auto-numbering
- Template library with localStorage persistence
- Copy to clipboard + WhatsApp sharing
- Mobile-first responsive design
- Bottom navigation
- Toast notifications