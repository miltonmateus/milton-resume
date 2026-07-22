import type { Resume } from '../types/resume';
import { renderEditToolbar } from '../components/edit-toolbar';
import { renderResumeActions } from '../components/resume-actions';
import { renderResumeContent, renderResumeLayout } from '../components/resume-layout';
import { renderStartDialog } from '../components/start-dialog';

export { renderResumeContent };

export function renderResume(resume: Resume): string {
  return `
    ${renderResumeActions()}
    ${renderEditToolbar()}
    ${renderStartDialog()}
    ${renderResumeLayout(resume)}
  `;
}
