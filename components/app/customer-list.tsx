'use client';

import { useState } from 'react';
import { Search, Users, Plus, Phone, MapPin, MoreVertical, X } from 'lucide-react';
import { useCustomers } from '@/lib/store';
import type { Customer } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; phone: string; address: string; notes: string }) => void;
  initialData?: Customer | null;
  isEdit?: boolean;
}

function CustomerModal({ isOpen, onClose, onSave, initialData, isEdit }: CustomerModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name: name.trim(), phone, address, notes });
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
            <Users className="h-5 w-5 text-[var(--color-primary)]" />
            {isEdit ? 'Edit Customer' : 'Tambah Customer'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Nama *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama customer"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              No. WhatsApp
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Alamat
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat lengkap"
              rows={2}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Catatan
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan tentang customer"
              rows={2}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className={cn(
              'flex-1 rounded-lg py-2.5 text-sm font-medium text-white',
              name.trim()
                ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
                : 'bg-[var(--color-text-muted)] cursor-not-allowed'
            )}
          >
            {isEdit ? 'Update' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onSelect: (customer: Customer) => void;
}

function CustomerCard({ customer, onEdit, onDelete, onSelect }: CustomerCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:border-[var(--color-primary)]/30">
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={() => onSelect(customer)}
          className="flex-1 text-left"
        >
          <h3 className="font-medium text-[var(--color-text-primary)]">{customer.name}</h3>
          {customer.phone && (
            <p className="mt-1 flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
              <Phone className="h-3 w-3" />
              {customer.phone}
            </p>
          )}
          {customer.address && (
            <p className="mt-1 flex items-start gap-1 text-sm text-[var(--color-text-muted)]">
              <MapPin className="h-3 w-3 mt-0.5" />
              <span className="line-clamp-1">{customer.address}</span>
            </p>
          )}
        </button>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg">
              <button
                onClick={() => {
                  onEdit(customer);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(customer.id);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CustomerList() {
  const { customers, deleteCustomer, updateCustomer, addCustomer, isLoaded } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery) ||
      c.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (data: { name: string; phone: string; address: string; notes: string }) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, data);
    } else {
      addCustomer(data);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus customer ini?')) {
      deleteCustomer(id);
    }
  };

  const handleSelect = (customer: Customer) => {
    // Copy customer info to clipboard for quick use
    const text = `${customer.name}\n${customer.phone || ''}\n${customer.address || ''}`.trim();
    navigator.clipboard.writeText(text);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari customer..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-10 pr-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <button
          onClick={() => {
            setEditingCustomer(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </button>
      </div>

      {/* Customer List */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12">
          <Users className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
          <p className="mb-2 font-medium text-[var(--color-text-primary)]">
            {searchQuery ? 'Customer tidak ditemukan' : 'Belum ada customer'}
          </p>
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
            {searchQuery ? 'Coba kata kunci lain' : 'Yuk tambah customer pertamamu'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setEditingCustomer(null);
                setShowModal(true);
              }}
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
            >
              Tambah Customer
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CustomerModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCustomer(null);
        }}
        onSave={handleSave}
        initialData={editingCustomer}
        isEdit={!!editingCustomer}
      />
    </div>
  );
}
