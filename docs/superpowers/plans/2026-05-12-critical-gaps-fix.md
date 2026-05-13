# Critical Gaps Fix - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical gaps identified in feature audit - P0 "Save as Template", P1 template edit, P1 auth middleware

**Architecture:** Add template modal component, integrate with forms, implement NextAuth middleware

**Tech Stack:** Next.js 16, NextAuth v5, React Hook Form, Tailwind CSS

---

## File Mapping

### New Files
- `components/shared/template-modal.tsx` - Modal for saving/editing templates

### Modified Files
- `components/app/quotation-form.tsx:44-68` - Add "Save as Template" button
- `components/app/invoice-form.tsx:44-74` - Add "Save as Template" button
- `components/app/template-list.tsx:27-30` - Replace alert with modal
- `app/app/layout.tsx` - Add user display + logout button
- `proxy.ts` - Protect /app routes (Next.js 16 uses proxy.ts, not middleware.ts)
- `lib/store.ts` - Already has addTemplate/updateTemplate, use existing

---

## TASK 1: Create Template Modal Component

**Files:**
- Create: `components/shared/template-modal.tsx`
- Modify: `components/app/template-list.tsx:27-30`

- [ ] **Step 1: Create template modal component**

Create a new file `components/shared/template-modal.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { X, Bookmark } from 'lucide-react';
import type { Template } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, category: string) => void;
  initialName?: string;
  initialCategory?: string;
  title?: string;
}

const CATEGORIES = ['greeting', 'quotation', 'invoice', 'payment', 'shipping', 'closing', 'other'];

export function TemplateModal({
  isOpen,
  onClose,
  onSave,
  initialName = '',
  initialCategory = 'other',
  title = 'Simpan sebagai Template',
}: TemplateModalProps) {
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState(initialCategory);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), category);
      setName('');
      setCategory('other');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
            <Bookmark className="h-5 w-5 text-[var(--color-primary)]" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Nama Template
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Quotation Jersey Size M"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
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
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test the modal renders**

Verify the file exists and imports work:
```bash
grep -c "TemplateModal" /home/kiyaya/kiyadev/heulaulab/adminku/apps/web/components/shared/template-modal.tsx
```
Expected: 1 (or more)

---

## TASK 2: Add "Save as Template" to Quotation Form

**Files:**
- Modify: `components/app/quotation-form.tsx`

- [ ] **Step 1: Add import for TemplateModal and useTemplates**

Find line 9 (imports) in quotation-form.tsx and add:
```tsx
import { useTemplates } from '@/lib/store';
import { TemplateModal } from '@/components/shared/template-modal';
```

- [ ] **Step 2: Add state for modal and use useTemplates hook**

Add after line 15 (`const { showToast } = useToast();`):
```tsx
const { addTemplate } = useTemplates();
const [showTemplateModal, setShowTemplateModal] = useState(false);
const [templatePreview, setTemplatePreview] = useState('');
```

- [ ] **Step 3: Add modal after the form, before closing form tag**

Find line 256 (after the preview div closing tag, before line 257 `}`) and add:
```tsx
      {/* Save as Template Modal */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSave={(name, category) => {
          addTemplate({
            name,
            content: templatePreview,
            category,
          });
          showToast('Template berhasil disimpan!');
        }}
        title="Simpan Quotation sebagai Template"
      />
```

- [ ] **Step 4: Add "Save as Template" button to preview section**

Find the preview section in quotation-form.tsx (around line 200-240). After the "Bagikan" button, add:
```tsx
<button
  type="button"
  onClick={() => {
    setTemplatePreview(preview);
    setShowTemplateModal(true);
  }}
  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
>
  <Bookmark className="h-4 w-4" />
  Simpan Template
</button>
```

- [ ] **Step 5: Add Bookmark import**

Find line 6 and add Bookmark to the imports from lucide-react:
```tsx
import { Plus, Trash2, Copy, Share2, Check, Bookmark } from 'lucide-react';
```

- [ ] **Step 6: Verify the changes**

Run dev server and check quotation form has new button:
```bash
cd /home/kiyaya/kiyadev/heulaulab/adminku/apps/web && npm run dev &
sleep 5
echo "Quotation form updated - check for 'Simpan Template' button"
```

---

## TASK 3: Add "Save as Template" to Invoice Form

**Files:**
- Modify: `components/app/invoice-form.tsx`

- [ ] **Step 1: Add import for TemplateModal and useTemplates**

Find line 9 (imports) in invoice-form.tsx and add:
```tsx
import { useTemplates } from '@/lib/store';
import { TemplateModal } from '@/components/shared/template-modal';
```

- [ ] **Step 2: Add state for modal and use useTemplates hook**

Add after line 16 (`const { showToast } = useToast();`):
```tsx
const { addTemplate } = useTemplates();
const [showTemplateModal, setShowTemplateModal] = useState(false);
const [templatePreview, setTemplatePreview] = useState('');
```

- [ ] **Step 3: Add "Simpan Template" button to preview section**

Find the preview section in invoice-form.tsx (around line 224-256). After the "Bagikan" button, add:
```tsx
<button
  type="button"
  onClick={() => {
    setTemplatePreview(preview);
    setShowTemplateModal(true);
  }}
  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]"
>
  <Bookmark className="h-4 w-4" />
  Simpan Template
</button>
```

- [ ] **Step 4: Add TemplateModal at end of form**

Find where the form ends (after preview div) and add:
```tsx
      {/* Save as Template Modal */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSave={(name, category) => {
          addTemplate({
            name,
            content: templatePreview,
            category,
          });
          showToast('Template berhasil disimpan!');
        }}
        title="Simpan Invoice sebagai Template"
      />
```

- [ ] **Step 5: Add Bookmark import**

Find line 6 and add Bookmark:
```tsx
import { Plus, Trash2, Copy, Share2, Check, Bookmark } from 'lucide-react';
```

---

## TASK 4: Implement Template Edit Functionality

**Files:**
- Modify: `components/app/template-list.tsx`
- Modify: `components/shared/template-modal.tsx` (add edit mode)

- [ ] **Step 1: Update TemplateModal to support edit mode**

Modify the TemplateModal component to accept initial values and pass back updates:
```tsx
interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, category: string) => void;
  onDelete?: () => void;
  initialName?: string;
  initialCategory?: string;
  title?: string;
  isEdit?: boolean;
}
```

Update the button section to show Delete for edit mode:
```tsx
<div className="mt-6 flex gap-3">
  {onDelete && (
    <button
      onClick={onDelete}
      className="rounded-lg border border-[var(--color-error)]/30 px-4 py-2.5 text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
    >
      Hapus
    </button>
  )}
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
```

- [ ] **Step 2: Update TemplateList to use modal for edit**

Replace the `handleEdit` function in template-list.tsx:
```tsx
import { useState } from 'react';
import { TemplateModal } from '@/components/shared/template-modal';

// Add state
const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

// Replace handleEdit
const handleEdit = (template: Template) => {
  setEditingTemplate(template);
};

// Add modal
<TemplateModal
  isOpen={!!editingTemplate}
  onClose={() => setEditingTemplate(null)}
  onSave={(name, category) => {
    if (editingTemplate) {
      // Note: need to add updateTemplate to destructured useTemplates
    }
  }}
  onDelete={() => {
    if (editingTemplate && window.confirm('Hapus template ini?')) {
      deleteTemplate(editingTemplate.id);
      setEditingTemplate(null);
    }
  }}
  initialName={editingTemplate?.name}
  initialCategory={editingTemplate?.category}
  title="Edit Template"
  isEdit
/>
```

- [ ] **Step 3: Update useTemplates destructuring**

Find where useTemplates is used and add updateTemplate:
```tsx
const { templates, deleteTemplate, updateTemplate, isLoaded } = useTemplates();
```

Then update the onSave in the modal:
```tsx
onSave={(name, category) => {
  if (editingTemplate) {
    updateTemplate(editingTemplate.id, { name, category });
    showToast('Template berhasil diupdate!');
    setEditingTemplate(null);
  }
}}
```

- [ ] **Step 4: Add showToast to TemplateList**

Add to imports and add to component:
```tsx
import { useToast } from '@/components/shared/toast';
// In component
const { showToast } = useToast();
```

---

## TASK 5: Add Auth Middleware and Logout

**Files:**
- Create: `middleware.ts` (if not exists)
- Modify: `app/app/layout.tsx`

- [ ] **Step 1: Check if proxy.ts exists**

```bash
ls -la /home/kiyaya/kiyadev/heulaulab/adminku/apps/web/proxy.ts 2>/dev/null || echo "Not found"
```

- [ ] **Step 2: Create proxy.ts for route protection**

Create `proxy.ts` in apps/web/ (Next.js 16 uses proxy.ts instead of middleware.ts):
```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export default auth(function middleware(req: NextRequest & { auth: unknown }) {
  const isLoggedIn = !!(req as { auth: { user?: unknown } }).auth?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');
  const isAppRoute = req.nextUrl.pathname.startsWith('/app');

  // If trying to access /app without auth, redirect to login
  if (isAppRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and on login page, redirect to dashboard
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/app/:path*', '/login'],
};
```

- [ ] **Step 3: Add user display and logout to app layout**

Read current `app/app/layout.tsx` first, then update to include:
```tsx
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';

// In component:
const { data: session } = useSession();

// Add to header:
<div className="flex items-center gap-3">
  {session?.user && (
    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
      <User className="h-4 w-4" />
      <span>{session.user.name || session.user.email}</span>
    </div>
  )}
  <button
    onClick={() => signOut({ callbackUrl: '/' })}
    className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-error)]"
    title="Logout"
  >
    <LogOut className="h-5 w-5" />
  </button>
</div>
```

- [ ] **Step 4: Make sure auth export exists**

Check `auth.ts` exists and exports `auth`:
```bash
grep -n "export.*auth" /home/kiyaya/kiyadev/heulaulab/adminku/apps/web/auth.ts
```

If not, create/update auth.ts to export the NextAuth instance.

---

## Verification Checklist

After all tasks, verify:

- [ ] **Template Modal:** Can open modal from quotation and invoice forms
- [ ] **Save Template:** Entering name saves template to localStorage
- [ ] **Edit Template:** Clicking edit opens modal with pre-filled values
- [ ] **Delete Template:** Can delete templates from edit modal
- [ ] **Auth Middleware:** /app routes redirect to /login when not authenticated
- [ ] **Logout:** Button signs out and redirects to home
- [ ] **User Display:** Shows user name/email in app layout

---

## Dependencies

- NextAuth v5 configured (already in package.json)
- React Hook Form (already in package.json)
- lucide-react (already in package.json)
- useTemplates hook (already in lib/store.ts)
