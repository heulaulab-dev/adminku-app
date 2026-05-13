# Changelog

All notable changes to AdminKu will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Nothing yet

### Changed
- Nothing yet

### Fixed
- Nothing yet

---

## [0.4.0] - 2026-05-13

### Added
- **Pricing Page** (`/pricing`)
  - 3 tiers: Gratis (free), Starter (Rp 99.000/month), Pro (Rp 199.000/month)
  - Yearly options with 20% discount
  - Feature comparison table
  - Starter and Pro tier badges
- **Navbar Pricing Link** — "Harga" link added to landing page navigation
- **Usage Stats Dashboard** (`/app/stats`)
  - Streak tracking (consecutive days of use)
  - Total documents created (quotations, invoices, templates)
  - Quick action cards
- **Quotation/Invoice History**
  - Saved to localStorage
  - Accessible from `/app/quotes` and `/app/invoices` pages
  - Delete functionality for history items
- **Template Categories Filter**
  - Filter by category: Semua, Salam, Pembayaran, Pengiriman, Penutup
  - Category badges on template cards
- **App Shell Enhancements**
  - Logout button with confirmation
  - User name/email display in header
  - Quick stats in header

### Changed
- **Dashboard** — Added stats dashboard component with streak display
- **Template Modal** — Added category selector when saving templates
- **Toast Notifications** — Improved messaging for better UX

---

## [0.3.0] - 2026-05-12

### Added
- **Customer Database** (`/app/customers`)
  - Full CRUD operations (Create, Read, Update, Delete)
  - localStorage persistence
  - Auto-fill customer info on forms
  - Search functionality
- **PDF Export**
  - html2canvas + jsPDF implementation
  - Download quotation/invoice as PDF
  - Clean, printable format
- **Dark Mode**
  - CSS variables toggle system
  - Persisted in localStorage
  - System preference detection
- **App Shell** — Layout wrapper with bottom navigation
  - Mobile-first responsive design
  - Tab-based navigation

### Changed
- Improved form validation with Zod schemas
- Enhanced UI components with better error states
- Updated landing page features section

---

## [0.2.0] - 2026-05-12

### Added
- **Auth System**
  - NextAuth v5 with Google OAuth provider
  - Session management
  - User profile data
- **Auth Middleware** — Route protection for `/app` routes
- **Login Page** (`/login`) — Google sign-in with branded UI
- **Template System**
  - Full CRUD operations
  - localStorage persistence
  - Search functionality
- **Template Modal** — Save/edit templates with name and category
- **Default Templates** — 5 starter templates:
  - Salam Pembuka (greeting)
  - Konfirmasi Pembayaran (payment)
  - Konfirmasi Pengiriman (shipping)
  - Pengingat Pembayaran (payment reminder)
  - Penutup Standard (closing)

### Changed
- Migrated data storage to localStorage for anonymous users
- Improved toast notification system

---

## [0.1.0] - 2026-05-12

### Added
- **Landing Page**:
  - Hero section with CTA
  - Features section
  - Testimonials section
  - FAQ section
  - Footer with links

- **Message Formatter** (`/app/compose`):
  - Bold, italic, strikethrough formatting
  - Bullet list support
  - Copy to clipboard
  - Share to WhatsApp (Web Share API)

- **Quotation Generator** (`/app/quotes/new`):
  - Customer info (name, phone, address)
  - Dynamic product list with quantities and prices
  - Auto-calculation of totals (subtotal, tax, grand total)
  - Optional notes field
  - Preview before copy
  - Save as template functionality

- **Invoice Generator** (`/app/invoices/new`):
  - Auto-generated invoice numbers (INV-YYYYMMDD-XXX)
  - Payment method selection
  - Multiple payment methods supported (Bank Transfer, GoPay, OVO, Dana, Cash)
  - Same product list as quotation

- **Order Recap Generator** (`/app/order-recap`):
  - Customer info section
  - Product list with quantities
  - Shipping info (courier, tracking number, estimated arrival)
  - Copy to WhatsApp format

- **Payment Reminder Generator** (`/app/payment-reminder`):
  - Customer name and amount fields
  - Due date input
  - Payment method selection
  - Automatic message formatting

- **Shipping Confirmation Generator** (`/app/shipping-confirmation`):
  - Customer info section
  - Courier and tracking number
  - Estimated arrival date
  - Auto-formatted WhatsApp message

- **Bottom Navigation**:
  - Home, Quotes, Invoices, Templates tabs
  - Mobile-first responsive design

- **Toast Notifications**:
  - Success/error feedback
  - Auto-dismiss
  - WhatsApp share confirmations

### Changed
- Initial project setup with Next.js 16
- TypeScript configuration
- Tailwind CSS v4 setup
- CSS variables for theming
- Lucide React icons

---

## [0.0.1] - 2026-05-12

### Added
- Initial project structure
- README with basic Next.js documentation

[unreleased]: https://github.com/heulaulab/adminku/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/heulaulab/adminku/releases/tag/v0.4.0
[0.3.0]: https://github.com/heulaulab/adminku/releases/tag/v0.3.0
[0.2.0]: https://github.com/heulaulab/adminku/releases/tag/v0.2.0
[0.1.0]: https://github.com/heulaulab/adminku/releases/tag/v0.1.0
[0.0.1]: https://github.com/heulaulab/adminku/releases/tag/v0.0.1