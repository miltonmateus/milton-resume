import type { Certificate } from '../types/resume';
import { escapeAttribute, escapeHtml } from '../utils/html';

export function renderCertificateItem(item: Certificate): string {
  const meta = [item.issuer, item.date].filter(Boolean).join(' - ');
  const credential = item.credentialUrl
    ? `<a href="${escapeAttribute(item.credentialUrl)}" target="_blank" rel="noreferrer">Ver credencial</a>`
    : '';

  return `
    <article class="certificate-item">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(meta)}</p>
      ${credential}
    </article>
  `;
}
