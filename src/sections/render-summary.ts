import type { Summary } from '../types/resume';

export function renderSummary(summary: Summary): string {
  return `
    <section>
      <h2>${summary.title}</h2>
      ${summary.paragraphs
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join('')}
    </section>
  `;
}