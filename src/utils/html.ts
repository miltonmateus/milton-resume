export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function escapeAttribute(value: string): string {
  return escapeHtml(value);
}

export function renderTrustedHtml(value: string): string {
  return value;
}

export function escapeUrl(value: string): string {
  try {
    const url = new URL(value, 'http://localhost');
    if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:' || url.protocol === 'tel:') {
      return escapeAttribute(value);
    }
  } catch {
    return '#';
  }

  return '#';
}
