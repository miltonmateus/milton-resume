import type { SkillGroup } from '../types/resume';
import { renderSectionTitle } from '../components/section-title';
import { renderSkillGroup } from '../components/skill-group';

export function renderSkills(skills: SkillGroup[]): string {
  return `
    <section class="skills sidebar-section">
      ${renderSectionTitle({ icon: 'blocks', label: ' Competências' })}

      ${skills
        .map(renderSkillGroup)
        .join('')}
    </section>
  `;
}
