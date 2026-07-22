import { selectors } from '../../constants/selectors';
import { storageKeys } from '../../constants/storage';

export function restoreCustomizedResume(resumeElement: HTMLElement): void {
  const savedResumeMarkup = localStorage.getItem(storageKeys.customizedResumeMarkup);
  if (!savedResumeMarkup) return;

  resumeElement.innerHTML = savedResumeMarkup;
  resumeElement.querySelectorAll<HTMLElement>('[contenteditable]').forEach((element) => {
    element.removeAttribute('contenteditable');
    element.spellcheck = false;
  });
}

export function saveCustomizedResume(resumeElement: HTMLElement): void {
  const cleanResume = resumeElement.cloneNode(true) as HTMLElement;

  cleanResume.querySelectorAll(selectors.editOnly).forEach((element) => element.remove());
  cleanResume.querySelectorAll<HTMLElement>('[contenteditable]').forEach((element) => {
    element.removeAttribute('contenteditable');
    element.removeAttribute('spellcheck');
  });

  localStorage.setItem(storageKeys.customizedResumeMarkup, cleanResume.innerHTML);
}

export function clearCustomizedResume(): void {
  localStorage.removeItem(storageKeys.customizedResumeMarkup);
}

export function hasCustomizedResume(): boolean {
  return localStorage.getItem(storageKeys.customizedResumeMarkup) !== null;
}
