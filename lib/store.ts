'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Template, Customer } from './types';

const TEMPLATES_KEY = 'adminku_templates';
const CUSTOMERS_KEY = 'adminku_customers';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load templates on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEMPLATES_KEY);
      if (stored) {
        setTemplates(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load templates:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save templates when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    }
  }, [templates, isLoaded]);

  const addTemplate = useCallback((template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: Template = {
      ...template,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTemplates((prev) => [newTemplate, ...prev]);
    return newTemplate;
  }, []);

  const updateTemplate = useCallback((id: string, updates: Partial<Template>) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
      )
    );
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    templates,
    isLoaded,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  };
}

// Customer Store
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOMERS_KEY);
      if (stored) {
        setCustomers(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load customers:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    }
  }, [customers, isLoaded]);

  const addCustomer = useCallback((customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    return newCustomer;
  }, []);

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
      )
    );
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    customers,
    isLoaded,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
}

// Default templates
export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'default-1',
    name: 'Salam Pembuka',
    content: 'Halo {nama}! Terima kasih sudah order di toko kami 🙏\n\nBerikut detail pesanan kamu:',
    category: 'greeting',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'default-2',
    name: 'Konfirmasi Pembayaran',
    content: 'Kami sudah terima pembayaran kamu! 🎉\n\nPesanan akan kami proses dan kirimkan besok ya.\n\nTerima kasih!',
    category: 'payment',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'default-3',
    name: 'Konfirmasi Pengiriman',
    content: 'Pesanan kamu sudah dikirim! 📦\n\n*Kurir:* {kurir}\n*No. Resi:* {resi}\n\nSilakan pantau di website {kurir}. Terima kasih! 🙏',
    category: 'shipping',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'default-4',
    name: 'Pengingat Pembayaran',
    content: 'Hai {nama}! 👋\n\nMohon bantuannya untuk segera melakukan pembayaran ya.\n\n*Jumlah:* {jumlah}\n*Transfer ke:* {metode} {nomor} a/n {atas_nama}\n\nTerima kasih! 🙏',
    category: 'payment',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'default-5',
    name: 'Penutup Standard',
    content: 'Jika ada pertanyaan, jangan ragu untuk hubungi kami ya.\n\nTerima kasih sudah berbelanja! 🛒\n\nSalam,\n{nama_toko}',
    category: 'closing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Quotation History Store
const QUOTATION_HISTORY_KEY = 'adminku_quotation_history';

export function useQuotationHistory() {
  const [history, setHistory] = useState<import('./types').QuotationHistory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(QUOTATION_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed.map((item: import('./types').QuotationHistory) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })));
      }
    } catch (e) {
      console.warn('Failed to load quotation history:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(QUOTATION_HISTORY_KEY, JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addQuotation = useCallback((quotation: Omit<import('./types').QuotationHistory, 'id' | 'createdAt'>) => {
    const newQuotation: import('./types').QuotationHistory = {
      ...quotation,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
    };
    setHistory((prev) => [newQuotation, ...prev].slice(0, 100));
    return newQuotation;
  }, []);

  const deleteQuotation = useCallback((id: string) => {
    setHistory((prev) => prev.filter((q) => q.id !== id));
  }, []);

  return { history, isLoaded, addQuotation, deleteQuotation };
}

// Invoice History Store
const INVOICE_HISTORY_KEY = 'adminku_invoice_history';

export function useInvoiceHistory() {
  const [history, setHistory] = useState<import('./types').InvoiceHistory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(INVOICE_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed.map((item: import('./types').InvoiceHistory) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })));
      }
    } catch (e) {
      console.warn('Failed to load invoice history:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(INVOICE_HISTORY_KEY, JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addInvoice = useCallback((invoice: Omit<import('./types').InvoiceHistory, 'id' | 'createdAt'>) => {
    const newInvoice: import('./types').InvoiceHistory = {
      ...invoice,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
    };
    setHistory((prev) => [newInvoice, ...prev].slice(0, 100));
    return newInvoice;
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setHistory((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return { history, isLoaded, addInvoice, deleteInvoice };
}

// Usage Stats Store
const USAGE_STATS_KEY = 'adminku_usage_stats';

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function useUsageStats() {
  const [stats, setStats] = useState<import('./types').UsageStats>({
    lastUsedDate: null,
    currentStreak: 0,
    longestStreak: 0,
    totalQuotations: 0,
    totalInvoices: 0,
    totalTemplates: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USAGE_STATS_KEY);
      if (stored) {
        setStats(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load usage stats:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(USAGE_STATS_KEY, JSON.stringify(stats));
    }
  }, [stats, isLoaded]);

  const recordUsage = useCallback((type: 'quotation' | 'invoice' | 'template') => {
    const today = getDateString(new Date());

    setStats((prev) => {
      // Calculate if streak continues
      let newStreak = prev.currentStreak;
      if (prev.lastUsedDate) {
        const lastDate = new Date(prev.lastUsedDate);
        const currentDate = new Date(today);
        const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          // Same day, no change
        } else if (diffDays === 1) {
          // Consecutive day
          newStreak = prev.currentStreak + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      return {
        lastUsedDate: today,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        totalQuotations: type === 'quotation' ? prev.totalQuotations + 1 : prev.totalQuotations,
        totalInvoices: type === 'invoice' ? prev.totalInvoices + 1 : prev.totalInvoices,
        totalTemplates: type === 'template' ? prev.totalTemplates + 1 : prev.totalTemplates,
      };
    });
  }, []);

  return { stats, isLoaded, recordUsage };
}
