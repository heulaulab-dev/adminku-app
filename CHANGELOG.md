# Changelog

All notable changes to AdminKu will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Pricing Page** — `/pricing` route with 3 tiers (Gratis, Starter Rp 99rb, Pro Rp 199rb), yearly options with 20% discount
- **Navbar Pricing Link** — "Harga" link added to landing page navigation

### Changed
- **App Shell** — Added logout button with user name/email display in header

### Fixed
- AGENTS.md feature audit now reflects actual codebase state

---

## [0.3.0] - 2026-05-12

### Added
- **Customer Database** — Full CRUD with localStorage persistence
- **PDF Export** — html2canvas + jsPDF implementation
- **Dark Mode** — CSS variables toggle system
- **App Shell** — Layout wrapper with bottom navigation

### Changed
- Improved form validation with Zod schemas
- Enhanced UI components with better error states

---

## [0.2.0] - 2026-05-12

### Added
- **Auth System** — NextAuth v5 with Google OAuth provider
- **Auth Middleware** — Route protection for `/app` routes
- **Login Page** — `/login` route with Google sign-in
- **Template System** — Full CRUD operations
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

- **Message Formatter**:
  - Bold, italic, strikethrough formatting
  - Bullet list support
  - Copy to clipboard
  - Share to WhatsApp

- **Quotation Generator**:
  - Customer info (name, phone, address)
  - Dynamic product list with quantities and prices
  - Auto-calculation of totals
  - Optional notes field
  - Preview before copy

- **Invoice Generator**:
  - Auto-generated invoice numbers
  - Payment method selection
  - Multiple payment methods supported
  - Same product list as quotation

- **Bottom Navigation**:
  - Home, Quotes, Invoices, Templates tabs
  - Mobile-first responsive design

- **Toast Notifications**:
  - Success/error feedback
  - Auto-dismiss

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

[unreleased]: https://github.com/heulaulab/adminku/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/heulaulab/adminku/releases/tag/v0.3.0
[0.2.0]: https://github.com/heulaulab/adminku/releases/tag/v0.2.0
[0.1.0]: https://github.com/heulaulab/adminku/releases/tag/v0.1.0
[0.0.1]: https://github.com/heulaulab/adminku/releases/tag/v0.0.1