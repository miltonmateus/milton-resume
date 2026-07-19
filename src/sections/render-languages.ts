import type { Language } from '../types/resume';

export function renderLanguages(languages: Language[]): string {
  return `
    <section class="languages sidebar-section">
      <h2><i class="section-icon" data-lucide="globe-2" aria-hidden="true"></i> Idiomas</h2>

      <ul>
        ${languages
          .map(
            (language) => `
              <li class="language-item">
                <div><strong>${language.name}</strong><span>${language.level}</span></div>
                <span class="language-bar"><i style="width: ${language.level === 'Nativo' ? '100' : '92'}%"></i></span>
              </li>
            `,
          )
          .join('')}
      </ul>
    </section>
  `;
}
