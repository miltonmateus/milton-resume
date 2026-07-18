import type { Education } from '../types/resume';

export function renderEducation(education: Education[]): string {
  return `
    <section class="education content-section">
      <h2><span class="section-icon">◆</span>Formação acadêmica</h2>

      <div class="education-grid">${education
        .map(
          (item) => `
            <article class="education-item">
              <h3>${item.institution}</h3>
              <p>${item.course}</p>
              <p>
                ${item.startDate}
                ${item.endDate ? ` — ${item.endDate}` : ''}
              </p>
              <p>${item.status}</p>
            </article>
          `,
        )
        .join('')}</div>
    </section>
  `;
}
