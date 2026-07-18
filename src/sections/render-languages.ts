import type { Language } from '../types/resume';

export function renderLanguages(languages: Language[]): string {
  return `
    <section>
      <h2>Idiomas</h2>

      <ul>
        ${languages
          .map(
            (language) => `
              <li>
                <strong>${language.name}</strong>: ${language.level}
              </li>
            `,
          )
          .join('')}
      </ul>
    </section>
  `;
}