import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/print.css';

import { resume } from './data/resume.data';
import { renderResume } from './engine/resume-renderer';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Elemento #app não encontrado.');
}

app.innerHTML = renderResume(resume);