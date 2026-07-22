import { createEditButton } from '../../components/edit-buttons';
import { selectors } from '../../constants/selectors';
import { refreshResumeIcons } from '../icons/resume-icons';
import { prepareEditableEntry } from './editable-entry';
import { saveCustomizedResume } from './resume-storage';

function addSkillControls(resumeElement: HTMLElement): void {
  resumeElement.querySelectorAll<HTMLElement>('.skill-group').forEach((group) => {
    if (group.querySelector(selectors.addSkill)) return;

    const button = createEditButton('add-skill', 'Adicionar competência', () => {
      const list = group.querySelector('ul');
      if (!list) return;

      const skill = document.createElement('li');
      skill.textContent = 'Nova competência';
      skill.contentEditable = 'true';
      skill.spellcheck = true;
      list.appendChild(skill);
      skill.focus();
      document.getSelection()?.selectAllChildren(skill);
      saveCustomizedResume(resumeElement);
    });

    group.appendChild(button);
  });
}

function addExperienceControl(resumeElement: HTMLElement): void {
  const experienceSection = resumeElement.querySelector<HTMLElement>('.experience');
  const timeline = experienceSection?.querySelector<HTMLElement>('.timeline');
  if (!experienceSection || !timeline || experienceSection.querySelector(selectors.addSection)) return;

  experienceSection.appendChild(createEditButton('add-section', 'Adicionar experiência', () => {
    const template = timeline.querySelector<HTMLElement>('.experience-item:last-child');
    if (!template) return;

    const entry = template.cloneNode(true) as HTMLElement;
    const heading = entry.querySelector('h3');
    const role = entry.querySelector('.role');
    const meta = entry.querySelectorAll('.meta p');
    const description = entry.querySelector('ul');

    if (heading) heading.textContent = 'Nome da empresa';
    if (role) role.textContent = 'Cargo ou função';
    if (meta[0]) meta[0].textContent = 'Início — Fim';
    if (meta[1]) meta[1].textContent = 'Cidade - Estado';
    if (description) description.innerHTML = '<li>Descreva sua principal atividade ou resultado.</li>';

    timeline.appendChild(entry);
    prepareEditableEntry(entry);
    saveCustomizedResume(resumeElement);
  }));
}

function addEducationControl(resumeElement: HTMLElement): void {
  const educationSection = resumeElement.querySelector<HTMLElement>('.education');
  const educationGrid = educationSection?.querySelector<HTMLElement>('.education-grid');
  if (!educationSection || !educationGrid || educationSection.querySelector(selectors.addSection)) return;

  educationSection.appendChild(createEditButton('add-section', 'Adicionar formação', () => {
    const template = educationGrid.querySelector<HTMLElement>('.education-item:last-child');
    if (!template) return;

    const entry = template.cloneNode(true) as HTMLElement;
    const heading = entry.querySelector('h3');
    const paragraphs = entry.querySelectorAll('p');

    if (heading) heading.textContent = 'Nome da instituição';
    if (paragraphs[0]) paragraphs[0].textContent = 'Curso ou formação';
    if (paragraphs[1]) paragraphs[1].textContent = 'Ano de início — Ano de conclusão';
    if (paragraphs[2]) paragraphs[2].textContent = 'Situação do curso';

    educationGrid.appendChild(entry);
    prepareEditableEntry(entry);
    saveCustomizedResume(resumeElement);
  }));
}

function addHighlightControl(resumeElement: HTMLElement): void {
  const highlightsSection = resumeElement.querySelector<HTMLElement>('.highlights');
  const highlightsGrid = highlightsSection?.querySelector<HTMLElement>('.highlights-grid');
  if (!highlightsSection || !highlightsGrid || highlightsSection.querySelector(selectors.addSection)) return;

  highlightsSection.appendChild(createEditButton('add-section', 'Adicionar destaque', () => {
    const template = highlightsGrid.querySelector<HTMLElement>('.highlight-item:last-child');
    if (!template) return;

    const entry = template.cloneNode(true) as HTMLElement;
    const heading = entry.querySelector('h3');
    const description = entry.querySelector('p');

    if (heading) heading.textContent = 'Novo destaque';
    if (description) description.textContent = 'Descreva uma qualidade, conquista ou diferencial profissional.';

    highlightsGrid.appendChild(entry);
    prepareEditableEntry(entry);
    saveCustomizedResume(resumeElement);
  }));
}

export function addResumeEditControls(resumeElement: HTMLElement): void {
  addSkillControls(resumeElement);
  addExperienceControl(resumeElement);
  addEducationControl(resumeElement);
  addHighlightControl(resumeElement);
  refreshResumeIcons();
}
