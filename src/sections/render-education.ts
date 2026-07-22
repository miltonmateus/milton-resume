import type { Education } from '../types/resume';
import { renderEducationItem } from '../components/education-item';
import { renderSectionTitle } from '../components/section-title';

export function renderEducation(education: Education[]): string {
  return `
    <section class="education content-section">
      ${renderSectionTitle({ icon: 'graduation-cap', label: 'Formação acadêmica' })}

      <div class="education-grid">${education
        .map(renderEducationItem)
        .join('')}</div>
    </section>
  `;
}
