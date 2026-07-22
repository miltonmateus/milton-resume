import { renderIcon } from './icon';
import type { Highlight } from '../types/resume';
import { escapeHtml } from '../utils/html';

export function renderHighlightItem(highlight: Highlight): string {
  return `
    <article class="highlight-item">
      ${renderIcon(highlight.icon, 'highlight-icon')}
      <div>
        <h3>${escapeHtml(highlight.title)}</h3>
        <p>${escapeHtml(highlight.description)}</p>
      </div>
    </article>
  `;
}
