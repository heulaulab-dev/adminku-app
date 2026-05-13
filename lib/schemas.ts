import { z } from 'zod';

export const quotationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nama produk wajib diisi'),
  quantity: z.number().min(1, 'Jumlah minimal 1'),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
});

export const quotationSchema = z.object({
  customerName: z.string().min(1, 'Nama customer wajib diisi'),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  items: z.array(quotationItemSchema).min(1, 'Minimal harus ada 1 produk'),
  notes: z.string().optional(),
});

export type QuotationInput = z.infer<typeof quotationSchema>;

export const invoiceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nama produk wajib diisi'),
  quantity: z.number().min(1, 'Jumlah minimal 1'),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
});

export const invoiceSchema = z.object({
  customerName: z.string().min(1, 'Nama customer wajib diisi'),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'Minimal harus ada 1 produk'),
  notes: z.string().optional(),
  paymentMethod: z.string().optional(),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;

export const templateSchema = z.object({
  name: z.string().min(1, 'Nama template wajib diisi'),
  content: z.string().min(1, 'Konten template wajib diisi'),
  category: z.string().optional(),
});

export type TemplateInput = z.infer<typeof templateSchema>;

export const shippingSchema = z.object({
  customerName: z.string().min(1, 'Nama customer wajib diisi'),
  courier: z.string().min(1, 'Kurir wajib dipilih'),
  trackingNumber: z.string().min(1, 'No. resi wajib diisi'),
  eta: z.string().optional(),
});

export type ShippingInput = z.infer<typeof shippingSchema>;

export const paymentReminderSchema = z.object({
  customerName: z.string().min(1, 'Nama customer wajib diisi'),
  amount: z.number().min(0, 'Jumlah tidak boleh negatif'),
  dueDate: z.string().min(1, 'Batas waktu wajib diisi'),
  paymentMethod: z.string().min(1, 'Metode pembayaran wajib dipilih'),
  paymentNumber: z.string().min(1, 'Nomor rekening wajib diisi'),
  accountName: z.string().min(1, 'Nama pemilik rekening wajib diisi'),
});

export type PaymentReminderInput = z.infer<typeof paymentReminderSchema>;

export const orderRecapSchema = z.object({
  customerName: z.string().min(1, 'Nama customer wajib diisi'),
  items: z.array(quotationItemSchema).min(1, 'Minimal harus ada 1 produk'),
  shippingCost: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export type OrderRecapInput = z.infer<typeof orderRecapSchema>;
