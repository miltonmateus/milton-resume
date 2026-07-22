import { renderIcon } from './icon';
import type { Experience } from '../types/resume';
import { escapeHtml } from '../utils/html';

export function renderExperienceItem(item: Experience): string {
  return `
    <article class="experience-item">
      ${renderIcon('building-2', 'timeline-marker')}
      <div class="experience-heading">
        <div><h3>${escapeHtml(item.company)}</h3><p class="role">${escapeHtml(item.role)}</p></div>
        <div class="meta">
          <p>${escapeHtml(`${item.startDate} — ${item.endDate}`)}</p>
          <p>${escapeHtml(item.location)}</p>
        </div>
      </div>

      <ul>
        ${item.description
          .map((description) => `<li>${escapeHtml(description)}</li>`)
          .join('')}
      </ul>
    </article>
  `;
}
