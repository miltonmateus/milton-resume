import type { Experience } from '../types/resume';

export function renderExperience(experience: Experience[]): string {
  return `
    <section class="experience content-section">
      <h2><i class="section-icon" data-lucide="pickaxe" aria-hidden="true"></i>Experiência profissional</h2>

      <div class="timeline">${experience
        .map(
          (item) => `
            <article class="experience-item">
              <i class="timeline-marker" data-lucide="building-2" aria-hidden="true"></i>
              <div class="experience-heading">
                <div><h3>${item.company}</h3><p class="role">${item.role}</p></div>
                <div class="meta"><p>${item.startDate} — ${item.endDate}</p><p>${item.location}</p></div>
              </div>

              <ul>
                ${item.description
                  .map((description) => `<li>${description}</li>`)
                  .join('')}
              </ul>
            </article>
          `,
        )
        .join('')}</div>
    </section>
  `;
}
