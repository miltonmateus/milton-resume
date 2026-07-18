import type { SkillGroup } from '../types/resume';

export function renderSkills(skills: SkillGroup[]): string {
  return `
    <section class="skills sidebar-section">
      <h2><span class="section-icon">&lt;/&gt;</span> Competências</h2>

      ${skills
        .map(
          (group) => `
            <article class="skill-group">
              <h3>${group.title}</h3>

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
