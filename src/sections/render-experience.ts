import type { Experience } from '../types/resume';
import { renderExperienceItem } from '../components/experience-item';
import { renderSectionTitle } from '../components/section-title';

export function renderExperience(experience: Experience[]): string {
  return `
    <section class="experience content-section">
      ${renderSectionTitle({ icon: 'pickaxe', label: 'Experiência profissional' })}

      <div class="timeline">${experience
        .map(renderExperienceItem)
        .join('')}</div>
    </section>
  `;
}
