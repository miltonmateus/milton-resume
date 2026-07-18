import type { Highlight } from '../types/resume';

export function renderHighlights(highlights: Highlight[]): string {
  return `
    <section class="highlights">
      <h2><span class="section-icon">★</span>Destaques</h2>
      <div class="highlights-grid">
        ${highlights
          .map(
            (highlight) => `
              <article class="highlight-item">
                <span class="highlight-icon" aria-hidden="true">${highlight.icon}</span>
                <div>
                  <h3>${highlight.title}</h3>
                  <p>${highlight.description}</p>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}
