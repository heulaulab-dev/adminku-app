import { TemplateList } from '@/components/app/template-list';
import { Bookmark } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-warning)] text-white">
          <Bookmark className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Template</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Template yang sudah kamu simpan</p>
        </div>
      </div>

      <TemplateList />
    </div>
  );
}