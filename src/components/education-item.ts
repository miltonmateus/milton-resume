import type { Education } from '../types/resume';
import { escapeHtml } from '../utils/html';

export function renderEducationItem(item: Education): string {
  const period = item.endDate ? `${item.startDate} — ${item.endDate}` : item.startDate;

  return `
    <article class="education-item">
      <h3>${escapeHtml(item.institution)}</h3>
      <p>${escapeHtml(item.course)}</p>
      <p>${escapeHtml(period)}</p>
      <p>${escapeHtml(item.status)}</p>
    </article>
  `;
}
