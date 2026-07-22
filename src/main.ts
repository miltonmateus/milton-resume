import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/print.css';

import { selectors } from './constants/selectors';
import { resume } from './data/resume.data';
import { renderResume } from './engine/resume-renderer';
import { initResumeCustomizer } from './features/editing/resume-customizer';
import { restoreCustomizedResume } from './features/editing/resume-storage';
import { refreshResumeIcons } from './features/icons/resume-icons';
import { initResumeLayoutSwitcher } from './features/layout/resume-layout-switcher';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Elemento #app não encontrado.');
}

app.innerHTML = renderResume(resume);

const resumeElement = document.querySelector<HTMLElement>(selectors.resume);
if (!resumeElement) {
  throw new Error('Elemento .resume não encontrado.');
}

restoreCustomizedResume(resumeElement);
refreshResumeIcons();

document.querySelector<HTMLButtonElement>(selectors.downloadPdf)?.addEventListener('click', () => {
  window.print();
});

initResumeLayoutSwitcher(resumeElement);
initResumeCustomizer(resumeElement);
