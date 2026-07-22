import type { Highlight } from '../types/resume';
import { renderHighlightItem } from '../components/highlight-item';
import { renderSectionTitle } from '../components/section-title';

export function renderHighlights(highlights: Highlight[]): string {
  return `
    <section class="highlights">
      ${renderSectionTitle({ icon: '★', label: 'Destaques', useLucide: false })}
      <div class="highlights-grid">
        ${highlights
          .map(renderHighlightItem)
          .join('')}
      </div>
    </section>
  `;
}
