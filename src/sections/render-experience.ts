import type { Experience } from '../types/resume';

export function renderExperience(experience: Experience[]): string {
  return `
    <section>
      <h2>Experiência profissional</h2>

      ${experience
        .map(
          (item) => `
            <article>
              <h3>${item.company}</h3>
              <p>${item.role}</p>
              <p>${item.startDate} — ${item.endDate}</p>
              <p>${item.location}</p>

              <ul>
                ${item.description
                  .map((description) => `<li>${description}</li>`)
                  .join('')}
              </ul>
            </article>
          `,
        )
        .join('')}
    </section>
  `;
}