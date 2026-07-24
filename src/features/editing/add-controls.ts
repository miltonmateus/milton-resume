import { createEditButton } from '../../components/edit-buttons';
import { renderCertificateItem } from '../../components/certificate-item';
import { renderLanguageItem } from '../../components/language-item';
import { selectors } from '../../constants/selectors';
import { refreshResumeIcons } from '../icons/resume-icons';
import { prepareEditableEntry } from './editable-entry';
import { saveCustomizedResume } from './resume-storage';

const languageLevels = ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'] as const;

function normalizeLanguageLevel(level: string): string | null {
  const normalizedLevel = level
    .trim()
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return languageLevels.find((option) => {
    const normalizedOption = option
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return normalizedOption === normalizedLevel;
  }) ?? null;
}

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

function addLanguageControl(resumeElement: HTMLElement): void {
  const languagesSection = resumeElement.querySelector<HTMLElement>('.languages');
  const languagesList = languagesSection?.querySelector<HTMLElement>('ul');
  if (!languagesSection || !languagesList || languagesSection.querySelector(selectors.addLanguage)) return;

  languagesSection.appendChild(createEditButton('add-skill add-language', 'Adicionar idioma', () => {
    const name = window.prompt('Nome do idioma:')?.trim();
    if (!name) return;

    const level = normalizeLanguageLevel(window.prompt(
      `Nível do idioma (${languageLevels.join(', ')}):`,
      'Básico',
    ) ?? '');

    if (!level) {
      window.alert(`Escolha um nível válido: ${languageLevels.join(', ')}.`);
      return;
    }

    languagesList.insertAdjacentHTML('beforeend', renderLanguageItem({ name, level }));
    const language = languagesList.querySelector<HTMLElement>('.language-item:last-child');
    if (language) {
      language.contentEditable = 'true';
      language.spellcheck = true;
      language.focus();
    }
    saveCustomizedResume(resumeElement);
  }));
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

function addCertificateControl(resumeElement: HTMLElement): void {
  const certificatesSection = resumeElement.querySelector<HTMLElement>('.certificates');
  const certificatesGrid = certificatesSection?.querySelector<HTMLElement>('.certificates-grid');
  if (!certificatesSection || !certificatesGrid || certificatesSection.querySelector(selectors.addCertificate)) return;

  certificatesSection.appendChild(createEditButton('add-section add-certificate', 'Adicionar certificado', () => {
    certificatesGrid.insertAdjacentHTML('beforeend', renderCertificateItem({
      title: 'Nome do certificado',
      issuer: 'Instituição emissora',
      date: 'Ano de emissão',
    }));

    const entry = certificatesGrid.querySelector<HTMLElement>('.certificate-item:last-child');
    if (!entry) return;

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
  addLanguageControl(resumeElement);
  addExperienceControl(resumeElement);
  addEducationControl(resumeElement);
  addCertificateControl(resumeElement);
  addHighlightControl(resumeElement);
  refreshResumeIcons();
}
