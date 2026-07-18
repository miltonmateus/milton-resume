import type { Education } from '../types/resume';

export function renderEducation(education: Education[]): string {
  return `
    <section>
      <h2>Formação acadêmica</h2>

      ${education
        .map(
          (item) => `
            <article>
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
        .join('')}
    </section>
  `;
}