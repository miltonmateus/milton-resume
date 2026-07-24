import type { Language } from '../types/resume';
import { escapeHtml } from '../utils/html';

function getLanguageProgress(level: string): number {
  const progressByLevel: Record<string, number> = {
    Básico: 25,
    Intermediário: 50,
    Avançado: 75,
    Fluente: 90,
    Nativo: 100,
  };

  return progressByLevel[level] ?? 50;
}

export function renderLanguageItem(language: Language): string {
  return `
    <li class="language-item">
      <div><strong>${escapeHtml(language.name)}</strong><span>${escapeHtml(language.level)}</span></div>
      <span class="language-bar"><i style="width: ${getLanguageProgress(language.level)}%"></i></span>
    </li>
  `;
}
