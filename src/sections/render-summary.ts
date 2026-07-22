import type { Summary } from '../types/resume';
import { renderSectionTitle } from '../components/section-title';
import { escapeHtml } from '../utils/html';

export function renderSummary(summary: Summary): string {
  return `
    <section class="summary content-section">
      ${renderSectionTitle({ icon: 'user-round-arrow-left', label: summary.title })}
      ${summary.paragraphs
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('')}
    </section>
  `;
}
