import type { SkillGroup } from '../types/resume';

const skillIcons: Record<string, string> = {
  Linguagens: 'braces',
  Backend: 'server-cog',
  Frontend: 'monitor-smartphone',
  'Banco de dados': 'database',
  Ferramentas: 'wrench',
};

export function renderSkills(skills: SkillGroup[]): string {
  return `
    <section class="skills sidebar-section">
      <h2><i class="section-icon" data-lucide="blocks" aria-hidden="true"></i> Competências</h2>

      ${skills
        .map(
          (group) => `
            <article class="skill-group">
              <h3><i data-lucide="${skillIcons[group.title] ?? 'blocks'}" aria-hidden="true"></i>${group.title}</h3>

              <ul>
                ${group.skills
                  .map((skill) => `<li>${skill}</li>`)
                  .join('')}
              </ul>
            </article>
          `,
        )
        .join('')}
    </section>
  `;
}
