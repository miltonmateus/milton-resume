import type { Resume } from '../types/resume';
import { renderEducation } from '../sections/render-education';
import { renderExperience } from '../sections/render-experience';
import { renderHeader } from '../sections/render-header';
import { renderHighlights } from '../sections/render-highlights';
import { renderLanguages } from '../sections/render-languages';
import { renderSkills } from '../sections/render-skills';
import { renderSummary } from '../sections/render-summary';

function renderSidebar(resume: Resume): string {
  return `
    <aside class="sidebar">
      ${renderHeader(resume.personal)}
      ${renderSkills(resume.skills)}
      ${renderLanguages(resume.languages)}
    </aside>
  `;
}

function renderContent(resume: Resume): string {
  return `
    <div class="content">
      ${renderSummary(resume.summary)}
      ${renderExperience(resume.experience)}
      ${renderEducation(resume.education)}
    </div>
  `;
}

export function renderResumeContent(resume: Resume): string {
  return `
      ${renderSidebar(resume)}
      ${renderContent(resume)}
      ${renderHighlights(resume.highlights)}
  `;
}

export function renderResumeLayout(resume: Resume): string {
  return `
    <main class="resume">
      ${renderResumeContent(resume)}
    </main>
  `;
}
