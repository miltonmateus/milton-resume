import type { Resume } from '../types/resume';
import { renderHeader } from '../sections/render-header';
import { renderSummary } from '../sections/render-summary';
import { renderExperience } from '../sections/render-experience';
import { renderSkills } from '../sections/render-skills';
import { renderEducation } from '../sections/render-education';
import { renderLanguages } from '../sections/render-languages';
import { renderHighlights } from '../sections/render-highlights';

export function renderResume(resume: Resume): string {
  return `
    <main class="resume">
      <aside class="sidebar">
        ${renderHeader(resume.personal)}
        ${renderSkills(resume.skills)}
        ${renderLanguages(resume.languages)}
      </aside>
      <div class="content">
        ${renderSummary(resume.summary)}
        ${renderExperience(resume.experience)}
        ${renderEducation(resume.education)}
      </div>
      ${renderHighlights(resume.highlights)}
    </main>
  `;
}
