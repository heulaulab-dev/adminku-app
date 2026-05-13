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
