'use client';

import { useState, useMemo } from 'react';
import { Search, FileText } from 'lucide-react';
import { TemplateCard } from './template-card';
import { useTemplates, DEFAULT_TEMPLATES } from '@/lib/store';
import { TemplateModal } from '@/components/shared/template-modal';
import { useToast } from '@/components/shared/toast';
import type { Template } from '@/lib/types';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'greeting', label: 'Salam' },
  { id: 'payment', label: 'Pembayaran' },
  { id: 'shipping', label: 'Pengiriman' },
  { id: 'closing', label: 'Penutup' },
];

export function TemplateList() {
  const { templates, deleteTemplate, updateTemplate, isLoaded } = useTemplates();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const { showToast } = useToast();

  const allTemplates = [...DEFAULT_TEMPLATES, ...templates];

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTemplates, searchQuery, selectedCategory]);

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus template ini?')) {
      deleteTemplate(id);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
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
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari template..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-10 pr-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              selectedCategory === cat.id
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/30'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12">
          <FileText className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
          <p className="mb-2 font-medium text-[var(--color-text-primary)]">Template tidak ditemukan</p>
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
            {searchQuery || selectedCategory !== 'all'
              ? 'Coba kata kunci atau kategori lain'
              : 'Yuk bikin template pertamamu'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Edit Template Modal */}
      <TemplateModal
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        onSave={(name, category) => {
          if (editingTemplate) {
            updateTemplate(editingTemplate.id, { name, category });
            showToast('Template berhasil diupdate!');
            setEditingTemplate(null);
          }
        }}
        onDelete={() => {
          if (editingTemplate && window.confirm('Hapus template ini?')) {
            deleteTemplate(editingTemplate.id);
            showToast('Template berhasil dihapus!');
            setEditingTemplate(null);
          }
        }}
        initialName={editingTemplate?.name}
        initialCategory={editingTemplate?.category}
        title="Edit Template"
        isEdit
      />
    </div>
  );
}