import type { Resume } from '../types/resume';
import { renderHeader } from '../sections/render-header';
import { renderSummary } from '../sections/render-summary';
import { renderExperience } from '../sections/render-experience';
import { renderSkills } from '../sections/render-skills';
import { renderEducation } from '../sections/render-education';
import { renderLanguages } from '../sections/render-languages';

export function renderResume(resume: Resume): string {
  return `
    <main class="resume">
      ${renderHeader(resume.personal)}
      ${renderSummary(resume.summary)}
      ${renderExperience(resume.experience)}
      ${renderSkills(resume.skills)}
      ${renderEducation(resume.education)}
      ${renderLanguages(resume.languages)}
    </main>
  `;
}