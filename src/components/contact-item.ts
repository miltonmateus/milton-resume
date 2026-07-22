import { renderIcon } from './icon';
import type { ResumeIconName } from '../types/resume';
import { escapeHtml, escapeUrl } from '../utils/html';

interface ContactItemOptions {
  icon: ResumeIconName;
  text: string;
  href?: string;
}

export function renderContactItem({ icon, text, href }: ContactItemOptions): string {
  const content = href
    ? `<a href="${escapeUrl(href)}"${href.startsWith('http') ? ' target="_blank" rel="noreferrer"' : ''}>${escapeHtml(text)}</a>`
    : `<span>${escapeHtml(text)}</span>`;

  return `<li>${renderIcon(icon)}${content}</li>`;
}
