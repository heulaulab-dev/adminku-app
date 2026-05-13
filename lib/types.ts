// Template
export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Quotation
export interface QuotationItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Quotation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: QuotationItem[];
  notes?: string;
  createdAt: Date;
  validUntil?: Date;
}

// Invoice
export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: InvoiceItem[];
  notes?: string;
  createdAt: Date;
  dueDate?: Date;
  paymentMethod?: string;
}

// Formatted WhatsApp message
export interface FormattedMessage {
  plain: string;
  html?: string;
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Customer
export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Quotation History
export interface QuotationHistory {
  id: string;
  customerName: string;
  customerPhone?: string;
  items: QuotationItem[];
  notes?: string;
  total: number;
  formattedMessage: string;
  createdAt: Date;
}

// Invoice History
export interface InvoiceHistory {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone?: string;
  items: InvoiceItem[];
  notes?: string;
  paymentMethod?: string;
  total: number;
  formattedMessage: string;
  createdAt: Date;
}

// Usage Stats
export interface UsageStats {
  lastUsedDate: string | null;
  currentStreak: number;
  longestStreak: number;
  totalQuotations: number;
  totalInvoices: number;
  totalTemplates: number;
}

// Product
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
