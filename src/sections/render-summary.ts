import type { Summary } from '../types/resume';

export function renderSummary(summary: Summary): string {
  return `
    <section class="summary content-section">
      <h2><i class="section-icon" data-lucide="user-round-arrow-left" aria-hidden="true"></i>${summary.title}</h2>
      ${summary.paragraphs
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join('')}
    </section>
  `;
}
