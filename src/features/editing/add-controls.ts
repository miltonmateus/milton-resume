import { createEditButton } from '../../components/edit-buttons';
import { renderCertificateItem } from '../../components/certificate-item';
import { renderExperienceItem } from '../../components/experience-item';
import { renderLanguageItem } from '../../components/language-item';
import { selectors } from '../../constants/selectors';
import type { Experience, ResumeIconName } from '../../types/resume';
import { refreshResumeIcons } from '../icons/resume-icons';
import { prepareEditableEntry } from './editable-entry';
import { saveCustomizedResume } from './resume-storage';

const languageLevels = ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'] as const;
const experienceIconOptions: Array<{ value: ResumeIconName; label: string }> = [
  { value: 'building-2', label: 'Empresa' },
  { value: 'code-xml', label: 'Desenvolvimento' },
  { value: 'server-cog', label: 'Backend' },
  { value: 'monitor-smartphone', label: 'Frontend' },
  { value: 'database', label: 'Dados' },
  { value: 'users-round', label: 'Equipe' },
  { value: 'shield-check', label: 'Qualidade' },
  { value: 'wrench', label: 'Operações' },
];

function formatMonth(value: string): string {
  if (!value) return '';

  const [year, month] = value.split('-');
  if (!year || !month) return value;

  return `${month}/${year}`;
}

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
    const dialog = getExperienceDialog();
    const form = dialog.querySelector<HTMLFormElement>('.experience-dialog-form');
    const currentInput = dialog.querySelector<HTMLInputElement>('[name="current"]');
    const endDateInput = dialog.querySelector<HTMLInputElement>('[name="endDate"]');

    if (!form || !currentInput || !endDateInput) return;

    form.reset();
    endDateInput.disabled = false;
    endDateInput.required = true;
    dialog.showModal();
    dialog.querySelector<HTMLInputElement>('[name="company"]')?.focus();

    form.onsubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const isCurrent = formData.get('current') === 'on';
      const startDate = String(formData.get('startDate') ?? '');
      const endDate = isCurrent ? 'Atual' : String(formData.get('endDate') ?? '');

      if (!isCurrent && endDate < startDate) {
        window.alert('A data final deve ser posterior à data inicial.');
        return;
      }

      const experience: Experience = {
        company: String(formData.get('company') ?? '').trim(),
        role: String(formData.get('role') ?? '').trim(),
        startDate: formatMonth(startDate),
        endDate: isCurrent ? 'Atual' : formatMonth(endDate),
        location: String(formData.get('location') ?? '').trim(),
        icon: String(formData.get('icon') ?? 'building-2') as ResumeIconName,
        description: ['Descreva sua principal atividade ou resultado.'],
      };

      timeline.insertAdjacentHTML('beforeend', renderExperienceItem(experience));
      const entry = timeline.querySelector<HTMLElement>('.experience-item:last-child');
      if (entry) prepareEditableEntry(entry);
      refreshResumeIcons();
      saveCustomizedResume(resumeElement);
      dialog.close();
    };
  }));
}

function getExperienceDialog(): HTMLDialogElement {
  const existingDialog = document.querySelector<HTMLDialogElement>('.experience-dialog');
  if (existingDialog) return existingDialog;

  const dialog = document.createElement('dialog');
  dialog.className = 'experience-dialog edit-only';
  dialog.innerHTML = `
    <form class="experience-dialog-form" method="dialog">
      <button class="close-experience-dialog" type="button" aria-label="Fechar">&times;</button>
      <h2>Adicionar experiência</h2>
      <div class="experience-dialog-grid">
        <label>
          Nome da experiência
          <input name="company" type="text" placeholder="Empresa, projeto ou organização" required />
        </label>
        <label>
          Ícone
          <select name="icon">
            ${experienceIconOptions.map((option) => `<option value="${option.value}">${option.label}</option>`).join('')}
          </select>
        </label>
        <label>
          Cargo ou função
          <input name="role" type="text" placeholder="Desenvolvedor Full Stack" required />
        </label>
        <label>
          Local
          <input name="location" type="text" placeholder="Porto Alegre - RS" required />
        </label>
        <label>
          Início
          <input name="startDate" type="month" required />
        </label>
        <label>
          Fim
          <input name="endDate" type="month" required />
        </label>
      </div>
      <label class="current-experience">
        <input name="current" type="checkbox" />
        Trabalho aqui atualmente
      </label>
      <div class="experience-dialog-actions">
        <button type="button" class="secondary-action">Cancelar</button>
        <button type="submit" class="primary-action">Adicionar</button>
      </div>
    </form>
  `;

  const currentInput = dialog.querySelector<HTMLInputElement>('[name="current"]');
  const endDateInput = dialog.querySelector<HTMLInputElement>('[name="endDate"]');

  currentInput?.addEventListener('change', () => {
    if (!endDateInput || !currentInput) return;

    endDateInput.disabled = currentInput.checked;
    endDateInput.required = !currentInput.checked;
    if (currentInput.checked) endDateInput.value = '';
  });

  dialog.querySelector<HTMLButtonElement>('.secondary-action')?.addEventListener('click', () => dialog.close());
  dialog.querySelector<HTMLButtonElement>('.close-experience-dialog')?.addEventListener('click', () => dialog.close());

  document.body.appendChild(dialog);

  return dialog;
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
