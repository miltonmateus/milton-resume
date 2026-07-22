import type { Language } from '../types/resume';
import { escapeHtml } from '../utils/html';

function getLanguageProgress(level: string): number {
  return level === 'Nativo' ? 100 : 92;
}

export function renderLanguageItem(language: Language): string {
  return `
    <li class="language-item">
      <div><strong>${escapeHtml(language.name)}</strong><span>${escapeHtml(language.level)}</span></div>
      <span class="language-bar"><i style="width: ${getLanguageProgress(language.level)}%"></i></span>
    </li>
  `;
}
