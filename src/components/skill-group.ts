import { renderIcon } from './icon';
import type { ResumeIconName, SkillGroup } from '../types/resume';
import { escapeHtml } from '../utils/html';

const skillIcons: Record<string, ResumeIconName> = {
  Linguagens: 'braces',
  Backend: 'server-cog',
  Frontend: 'monitor-smartphone',
  'Banco de dados': 'database',
  Ferramentas: 'wrench',
};

export function renderSkillGroup(group: SkillGroup): string {
  return `
    <article class="skill-group">
      <h3>${renderIcon(skillIcons[group.title] ?? 'blocks')}${escapeHtml(group.title)}</h3>

      <ul>
        ${group.skills
          .map((skill) => `<li>${escapeHtml(skill)}</li>`)
          .join('')}
      </ul>
    </article>
  `;
}
