import { allowedProfileImageTypes, maxProfileImageSizeInBytes, resumeAutosaveDelayInMs } from '../../constants/editing';
import { selectors } from '../../constants/selectors';
import { renderResumeContent } from '../../components/resume-layout';
import { blankResume, resume } from '../../data/resume.data';
import { debounce } from '../../utils/debounce';
import { addResumeEditControls } from './add-controls';
import { editableElementsSelector } from './editable-entry';
import { refreshResumeIcons } from '../icons/resume-icons';
import { clearCustomizedResume, hasCustomizedResume, saveCustomizedResume } from './resume-storage';

function updateEditableState(resumeElement: HTMLElement, enabled: boolean): void {
  resumeElement.querySelectorAll<HTMLElement>(editableElementsSelector).forEach((element) => {
    element.contentEditable = enabled ? 'true' : 'false';
    element.spellcheck = enabled;
    element.toggleAttribute('aria-label', enabled);
    if (enabled) element.setAttribute('aria-label', 'Campo editável do currículo');
  });

  resumeElement.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.toggleAttribute('aria-disabled', enabled);
  });
}

function updateCustomizeButton(button: HTMLButtonElement | null, enabled: boolean): void {
  if (!button) return;

  button.setAttribute('aria-pressed', String(enabled));
  if (button.lastChild) {
    button.lastChild.textContent = enabled ? ' Editando currículo' : ' Crie seu currículo';
  }
}

function initPhotoInput(resumeElement: HTMLElement): void {
  const photoInput = document.querySelector<HTMLInputElement>(selectors.photoInput);

  photoInput?.addEventListener('change', () => {
    const file = photoInput.files?.[0];
    if (!file) return;

    if (!allowedProfileImageTypes.includes(file.type as typeof allowedProfileImageTypes[number])) {
      window.alert('Escolha uma imagem em PNG, JPG ou WebP.');
      photoInput.value = '';
      return;
    }

    if (file.size > maxProfileImageSizeInBytes) {
      window.alert('Escolha uma imagem com até 2 MB.');
      photoInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const profileImage = resumeElement.querySelector<HTMLImageElement>(selectors.profileImage);
      if (profileImage && typeof reader.result === 'string') {
        profileImage.src = reader.result;
        saveCustomizedResume(resumeElement);
      }
    });
    reader.readAsDataURL(file);
  });
}

export function initResumeCustomizer(resumeElement: HTMLElement): void {
  const customizeButton = document.querySelector<HTMLButtonElement>(selectors.customizeResume);
  const backToOriginalButtons = document.querySelectorAll<HTMLButtonElement>(selectors.backToOriginal);
  const editToolbar = document.querySelector<HTMLElement>(selectors.editToolbar);
  const finishEditingButton = document.querySelector<HTMLButtonElement>(selectors.finishEditing);
  const resetResumeButton = document.querySelector<HTMLButtonElement>(selectors.resetResume);
  const saveStatus = document.querySelector<HTMLElement>(selectors.saveStatus);
  const startDialog = document.querySelector<HTMLDialogElement>(selectors.startDialog);
  const startBlankButton = document.querySelector<HTMLButtonElement>(selectors.startBlank);
  const startExampleButton = document.querySelector<HTMLButtonElement>(selectors.startExample);

  function setBackToOriginalVisible(visible: boolean): void {
    backToOriginalButtons.forEach((button) => {
      button.toggleAttribute('hidden', !visible);
    });
  }

  function announceSave(): void {
    if (!saveStatus) return;
    saveStatus.textContent = '';
    window.setTimeout(() => {
      saveStatus.textContent = 'Alterações salvas.';
    }, 20);
  }

  function saveAndAnnounce(): void {
    saveCustomizedResume(resumeElement);
    announceSave();
  }

  const saveCustomizedResumeDebounced = debounce(saveAndAnnounce, resumeAutosaveDelayInMs);

  function setEditing(enabled: boolean, shouldSave = true): void {
    resumeElement.classList.toggle('resume--editing', enabled);
    editToolbar?.toggleAttribute('hidden', !enabled);
    if (!enabled) resumeElement.querySelectorAll(selectors.editOnly).forEach((element) => element.remove());

    updateEditableState(resumeElement, enabled);
    if (enabled) addResumeEditControls(resumeElement);

    updateCustomizeButton(customizeButton, enabled);
    if (!enabled && shouldSave) {
      saveAndAnnounce();
      setBackToOriginalVisible(true);
      customizeButton?.focus();
    }
  }

  function returnToOriginalResume(): void {
    resumeElement.innerHTML = renderResumeContent(resume);
    clearCustomizedResume();
    refreshResumeIcons();
    setBackToOriginalVisible(false);
    setEditing(false, false);
  }

  setBackToOriginalVisible(hasCustomizedResume());

  customizeButton?.addEventListener('click', () => {
    if (resumeElement.classList.contains('resume--editing')) {
      setEditing(false);
      return;
    }

    startDialog?.showModal();
    startExampleButton?.focus();
    if (!startDialog) setEditing(true);
  });
  startBlankButton?.addEventListener('click', () => {
    resumeElement.innerHTML = renderResumeContent(blankResume);
    clearCustomizedResume();
    refreshResumeIcons();
    setBackToOriginalVisible(true);
    startDialog?.close();
    setEditing(true);
    finishEditingButton?.focus();
  });
  startExampleButton?.addEventListener('click', () => {
    startDialog?.close();
    setEditing(true);
    finishEditingButton?.focus();
  });
  startDialog?.addEventListener('close', () => {
    if (!resumeElement.classList.contains('resume--editing')) {
      customizeButton?.focus();
    }
  });
  backToOriginalButtons.forEach((button) => {
    button.addEventListener('click', returnToOriginalResume);
  });
  finishEditingButton?.addEventListener('click', () => setEditing(false));
  resumeElement.addEventListener('input', saveCustomizedResumeDebounced);
  resumeElement.addEventListener('click', (event) => {
    if (resumeElement.classList.contains('resume--editing') && (event.target as Element).closest('a')) {
      event.preventDefault();
    }
  });

  resetResumeButton?.addEventListener('click', () => {
    if (!window.confirm('Restaurar todo o conteúdo original do currículo?')) return;
    clearCustomizedResume();
    window.location.reload();
  });

  initPhotoInput(resumeElement);
}
