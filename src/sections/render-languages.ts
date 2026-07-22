import type { Language } from '../types/resume';
import { renderLanguageItem } from '../components/language-item';
import { renderSectionTitle } from '../components/section-title';

export function renderLanguages(languages: Language[]): string {
  return `
    <section class="languages sidebar-section">
      ${renderSectionTitle({ icon: 'globe-2', label: ' Idiomas' })}

      <ul>
        ${languages
          .map(renderLanguageItem)
          .join('')}
      </ul>
    </section>
  `;
}
