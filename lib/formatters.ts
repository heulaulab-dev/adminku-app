// WhatsApp formatting helpers
export function formatBold(text: string): string {
  return `**${text}**`;
}

export function formatItalic(text: string): string {
  return `_${text}_`;
}

export function formatStrikethrough(text: string): string {
  return `~~${text}~~`;
}

export function formatList(items: string[]): string {
  return items.map((item) => `• ${item}`).join('\n');
}

export function formatMoney(amount: number, currency = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

// Parse simple markdown-like syntax
export function parseWhatsAppText(input: string): string {
  let output = input;

  // Convert **text** to bold
  output = output.replace(/\*\*(.+?)\*\*/g, '*$1*');

  // Convert _text_ to italic
  output = output.replace(/_(.+?)_/g, '_$1_');

  // Convert ~~text~~ to strikethrough
  output = output.replace(/~~(.+?)~~/g, '~$1~');

  // Convert - item to bullet
  output = output.replace(/^- (.+)$/gm, '• $1');

  // Convert numbered lists
  output = output.replace(/^\d+\. (.+)$/gm, (_, text) => `• ${text}`);

  return output;
}

// Format quotation
export function formatQuotation(data: {
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  notes?: string;
}): string {
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `Halo ${data.customerName}! 🙏\n\n`;
  message += `Berikut quotation untuk pesanan kamu:\n\n`;
  message += formatList(
    data.items.map(
      (item) =>
        `${item.name} (${item.quantity}x) - ${formatMoney(item.price * item.quantity)}`
    )
  );
  message += `\n\n*Total: ${formatMoney(total)}*`;

  if (data.notes) {
    message += `\n\n📝 Catatan:\n${data.notes}`;
  }

  message += `\n\nMohon konfirmasi ya!`;
  return message;
}

// Format invoice
export function formatInvoice(data: {
  invoiceNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  notes?: string;
  paymentMethod?: string;
}): string {
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `📄 *INVOICE ${data.invoiceNumber}*\n\n`;
  message += `*Kepada:* ${data.customerName}\n\n`;
  message += formatList(
    data.items.map(
      (item) =>
        `${item.name} (${item.quantity}x) - ${formatMoney(item.price * item.quantity)}`
    )
  );
  message += `\n\n═══════════════════════`;
  message += `\n*Total: ${formatMoney(total)}*\n`;
  message += `═══════════════════════`;

  if (data.paymentMethod) {
    message += `\n\n*Pembayaran:* ${data.paymentMethod}`;
  }

  if (data.notes) {
    message += `\n\n📝 Catatan:\n${data.notes}`;
  }

  return message;
}

// Format shipping confirmation
export function formatShippingConfirmation(data: {
  customerName: string;
  trackingNumber: string;
  courier: string;
  eta?: string;
}): string {
  let message = `Halo ${data.customerName}! 📦\n\n`;
  message += `Pesanan kamu sudah dikirim!\n\n`;
  message += `*Kurir:* ${data.courier}\n`;
  message += `*No. Resi:* ${data.trackingNumber}`;

  if (data.eta) {
    message += `\n*Estimasi Tiba:* ${data.eta}`;
  }

  message += `\n\nSilakan pantau pengiriman di website ${data.courier}.`;
  message += `\n\nTerima kasih sudah berbelanja! 🙏`;

  return message;
}

// Format payment reminder
export function formatPaymentReminder(data: {
  customerName: string;
  amount: number;
  dueDate: string;
  paymentMethod: string;
  paymentNumber: string;
  accountName: string;
}): string {
  let message = `Halo ${data.customerName}! 📢\n\n`;
  message += `Mohon bantuannya untuk segera melakukan pembayaran:\n\n`;
  message += `*Jumlah:* ${formatMoney(data.amount)}\n`;
  message += `*Batas Waktu:* ${data.dueDate}\n\n`;
  message += `*Transfer ke:*\n`;
  message += `${data.paymentMethod} ${data.paymentNumber}\n`;
  message += `a/n *${data.accountName}*\n\n`;
  message += `Setelah transfer, mohon konfirmasi ya! 🙏`;

  return message;
}
