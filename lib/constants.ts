export const APP_NAME = 'AdminKu';
export const TAGLINE = 'WhatsApp admin, tanpa ribet.';

export const WHATSAPP_FORMAT = {
  BOLD: '**',
  ITALIC: '_',
  STRIKETHROUGH: '~~',
} as const;

export const QUOTATION_DEFAULTS = {
  validDays: 7,
  currency: 'IDR',
} as const;

export const INVOICE_DEFAULTS = {
  prefix: 'INV',
  paymentMethods: ['BCA', 'Mandiri', 'BNI', 'BTN', 'OVO', 'DANA', 'GoPay', 'ShopeePay'] as const,
};

export const NAV_ITEMS = [
  { href: '/compose', label: 'Pesan', icon: 'MessageSquare' },
  { href: '/quotes/new', label: 'Quotation', icon: 'FileText' },
  { href: '/invoices/new', label: 'Invoice', icon: 'Receipt' },
  { href: '/templates', label: 'Template', icon: 'Bookmark' },
] as const;

export const TEMPLATE_CATEGORIES = [
  { id: 'greeting', label: 'Salam & Pembuka' },
  { id: 'response', label: 'Response Umum' },
  { id: 'payment', label: 'Pembayaran' },
  { id: 'shipping', label: 'Pengiriman' },
  { id: 'closing', label: 'Penutup' },
] as const;
