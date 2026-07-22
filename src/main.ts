import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/print.css';

import { blankResume, resume } from './data/resume.data';
import { renderResume, renderResumeContent } from './engine/resume-renderer';
import {
  Blocks,
  Braces,
  Building2,
  Contact,
  CodeXml,
  createIcons,
  Database,
  Download,
  GraduationCap,
  Globe2,
  Link,
  Lightbulb,
  Mail,
  MapPin,
  MonitorSmartphone,
  Check,
  ImageUp,
  PanelsTopLeft,
  Pencil,
  Plus,
  Pickaxe,
  Phone,
  ServerCog,
  ShieldCheck,
  RotateCcw,
  UserRoundArrowLeft,
  Wrench,
  UsersRound,
} from 'lucide';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Elemento #app não encontrado.');
}

app.innerHTML = renderResume(resume);

const resumeElement = document.querySelector<HTMLElement>('.resume');

function renderIcons(): void {
  createIcons({
    icons: {
    UserRoundArrowLeft,
    Pickaxe,
    GraduationCap,
    Globe2,
    Blocks,
    Braces,
    Building2,
    Contact,
    Mail,
    Phone,
    MapPin,
    Link,
    CodeXml,
    ShieldCheck,
    Lightbulb,
    UsersRound,
    ServerCog,
    MonitorSmartphone,
    Database,
    Download,
    PanelsTopLeft,
    Pencil,
    Plus,
    ImageUp,
    RotateCcw,
    Check,
    Wrench,
    },
  });
}

renderIcons();

document.querySelector<HTMLButtonElement>('.download-pdf')?.addEventListener('click', () => {
  window.print();
});

const layoutSelect = document.querySelector<HTMLSelectElement>('.layout-select');

type ResumeLayout = 'creative' | 'executive' | 'dark';
const layoutOrder: ResumeLayout[] = ['creative', 'executive', 'dark'];

function setLayout(layout: ResumeLayout): void {
  resumeElement?.classList.toggle('resume--executive', layout === 'executive');
  resumeElement?.classList.toggle('resume--dark', layout === 'dark');
  if (layoutSelect) layoutSelect.value = layout;
  localStorage.setItem('resume-layout', layout);
}

const savedLayout = localStorage.getItem('resume-layout');
setLayout(layoutOrder.includes(savedLayout as ResumeLayout) ? savedLayout as ResumeLayout : 'creative');
layoutSelect?.addEventListener('change', () => {
  setLayout(layoutSelect.value as ResumeLayout);
});

const customizeButton = document.querySelector<HTMLButtonElement>('.customize-resume');
const editToolbar = document.querySelector<HTMLElement>('.edit-toolbar');
const finishEditingButton = document.querySelector<HTMLButtonElement>('.finish-editing');
const resetResumeButton = document.querySelector<HTMLButtonElement>('.reset-resume');
const photoInput = document.querySelector<HTMLInputElement>('.photo-input');
const startDialog = document.querySelector<HTMLDialogElement>('.start-dialog');
const startBlankButton = document.querySelector<HTMLButtonElement>('.start-blank');
const startExampleButton = document.querySelector<HTMLButtonElement>('.start-example');
const editableElementsSelector = 'h1, h2, h3, p, li, a';

function saveCustomizedResume(): void {
  if (!resumeElement) return;
  const cleanResume = resumeElement.cloneNode(true) as HTMLElement;
  cleanResume.querySelectorAll('.edit-only').forEach((element) => element.remove());
  cleanResume.querySelectorAll<HTMLElement>('[contenteditable]').forEach((element) => {
    element.removeAttribute('contenteditable');
    element.removeAttribute('spellcheck');
  });
  localStorage.setItem('custom-resume-markup', cleanResume.innerHTML);
}

function addSkillControls(): void {
  resumeElement?.querySelectorAll<HTMLElement>('.skill-group').forEach((group) => {
    if (group.querySelector('.add-skill')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'add-skill edit-only';
    button.innerHTML = '<i data-lucide="plus" aria-hidden="true"></i> Adicionar competência';
    button.addEventListener('click', () => {
      const list = group.querySelector('ul');
      if (!list) return;
      const skill = document.createElement('li');
      skill.textContent = 'Nova competência';
      skill.contentEditable = 'true';
      skill.spellcheck = true;
      list.appendChild(skill);
      skill.focus();
      document.getSelection()?.selectAllChildren(skill);
      saveCustomizedResume();
    });
    group.appendChild(button);
  });
  createIcons({ icons: { Plus } });
}

function prepareEditableEntry(entry: HTMLElement): void {
  entry.querySelectorAll<HTMLElement>(editableElementsSelector).forEach((element) => {
    element.contentEditable = 'true';
    element.spellcheck = true;
  });
  const firstField = entry.querySelector<HTMLElement>('h3, p, li');
  firstField?.focus();
  if (firstField) document.getSelection()?.selectAllChildren(firstField);
}

function createAddButton(label: string, onAdd: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'add-section edit-only';
  button.innerHTML = `<i data-lucide="plus" aria-hidden="true"></i> ${label}`;
  button.addEventListener('click', onAdd);
  return button;
}

function addSectionControls(): void {
  const experienceSection = resumeElement?.querySelector<HTMLElement>('.experience');
  const timeline = experienceSection?.querySelector<HTMLElement>('.timeline');
  if (experienceSection && timeline && !experienceSection.querySelector('.add-section')) {
    experienceSection.appendChild(createAddButton('Adicionar experiência', () => {
      const template = timeline.querySelector<HTMLElement>('.experience-item:last-child');
      if (!template) return;
      const entry = template.cloneNode(true) as HTMLElement;
      const heading = entry.querySelector('h3');
      const role = entry.querySelector('.role');
      const meta = entry.querySelectorAll('.meta p');
      if (heading) heading.textContent = 'Nome da empresa';
      if (role) role.textContent = 'Cargo ou função';
      if (meta[0]) meta[0].textContent = 'Início — Fim';
      if (meta[1]) meta[1].textContent = 'Cidade - Estado';
      const description = entry.querySelector('ul');
      if (description) description.innerHTML = '<li>Descreva sua principal atividade ou resultado.</li>';
      timeline.appendChild(entry);
      prepareEditableEntry(entry);
      saveCustomizedResume();
    }));
  }

  const educationSection = resumeElement?.querySelector<HTMLElement>('.education');
  const educationGrid = educationSection?.querySelector<HTMLElement>('.education-grid');
  if (educationSection && educationGrid && !educationSection.querySelector('.add-section')) {
    educationSection.appendChild(createAddButton('Adicionar formação', () => {
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
      saveCustomizedResume();
    }));
  }

  const highlightsSection = resumeElement?.querySelector<HTMLElement>('.highlights');
  const highlightsGrid = highlightsSection?.querySelector<HTMLElement>('.highlights-grid');
  if (highlightsSection && highlightsGrid && !highlightsSection.querySelector('.add-section')) {
    highlightsSection.appendChild(createAddButton('Adicionar destaque', () => {
      const template = highlightsGrid.querySelector<HTMLElement>('.highlight-item:last-child');
      if (!template) return;
      const entry = template.cloneNode(true) as HTMLElement;
      const heading = entry.querySelector('h3');
      const description = entry.querySelector('p');
      if (heading) heading.textContent = 'Novo destaque';
      if (description) description.textContent = 'Descreva uma qualidade, conquista ou diferencial profissional.';
      highlightsGrid.appendChild(entry);
      prepareEditableEntry(entry);
      saveCustomizedResume();
    }));
  }

  createIcons({ icons: { Plus } });
}

function setEditing(enabled: boolean): void {
  resumeElement?.classList.toggle('resume--editing', enabled);
  editToolbar?.toggleAttribute('hidden', !enabled);
  if (!enabled) resumeElement?.querySelectorAll('.edit-only').forEach((element) => element.remove());
  resumeElement?.querySelectorAll<HTMLElement>(editableElementsSelector).forEach((element) => {
    element.contentEditable = enabled ? 'true' : 'false';
    element.spellcheck = enabled;
  });

  if (enabled) {
    addSkillControls();
    addSectionControls();
  }

  if (customizeButton) {
    customizeButton.setAttribute('aria-pressed', String(enabled));
    customizeButton.lastChild!.textContent = enabled ? ' Editando currículo' : ' Crie seu currículo';
  }

  if (!enabled) saveCustomizedResume();
}

customizeButton?.addEventListener('click', () => {
  if (resumeElement?.classList.contains('resume--editing')) {
    setEditing(false);
    return;
  }
  startDialog?.showModal();
});
startBlankButton?.addEventListener('click', () => {
  if (!resumeElement) return;
  resumeElement.innerHTML = renderResumeContent(blankResume);
  localStorage.removeItem('custom-resume-markup');
  renderIcons();
  startDialog?.close();
  setEditing(true);
});
startExampleButton?.addEventListener('click', () => {
  startDialog?.close();
  setEditing(true);
});
finishEditingButton?.addEventListener('click', () => setEditing(false));
resumeElement?.addEventListener('input', saveCustomizedResume);
resumeElement?.addEventListener('click', (event) => {
  if (resumeElement.classList.contains('resume--editing') && (event.target as Element).closest('a')) {
    event.preventDefault();
  }
});

photoInput?.addEventListener('change', () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  if (file.size > 2_000_000) {
    window.alert('Escolha uma imagem com até 2 MB.');
    photoInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const profileImage = resumeElement?.querySelector<HTMLImageElement>('.profile-image');
    if (profileImage && typeof reader.result === 'string') {
      profileImage.src = reader.result;
      saveCustomizedResume();
    }
  });
  reader.readAsDataURL(file);
});

resetResumeButton?.addEventListener('click', () => {
  if (!window.confirm('Restaurar todo o conteúdo original do currículo?')) return;
  localStorage.removeItem('custom-resume-markup');
  window.location.reload();
});
