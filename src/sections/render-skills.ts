import type { SkillGroup } from '../types/resume';

export function renderSkills(skills: SkillGroup[]): string {
  return `
    <section>
      <h2>Competências</h2>

      ${skills
        .map(
          (group) => `
            <article>
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