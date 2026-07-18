import type { Summary } from '../types/resume';

export function renderSummary(summary: Summary): string {
  return `
    <section class="summary content-section">
      <h2><span class="section-icon">●</span>${summary.title}</h2>
      ${summary.paragraphs
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join('')}
    </section>
  `;
}
