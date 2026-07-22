import { selectors } from '../../constants/selectors';
import { storageKeys } from '../../constants/storage';

type ResumeLayout = 'creative' | 'executive' | 'dark';

const layoutOrder: ResumeLayout[] = ['creative', 'executive', 'dark'];

function isResumeLayout(layout: string | null): layout is ResumeLayout {
  return layoutOrder.includes(layout as ResumeLayout);
}

function setLayout(
  resumeElement: HTMLElement,
  layoutSelect: HTMLSelectElement | null,
  layout: ResumeLayout,
): void {
  resumeElement.classList.toggle('resume--executive', layout === 'executive');
  resumeElement.classList.toggle('resume--dark', layout === 'dark');
  if (layoutSelect) layoutSelect.value = layout;
  localStorage.setItem(storageKeys.resumeLayout, layout);
}

export function initResumeLayoutSwitcher(resumeElement: HTMLElement): void {
  const layoutSelect = document.querySelector<HTMLSelectElement>(selectors.layoutSelect);
  const savedLayout = localStorage.getItem(storageKeys.resumeLayout);
  const initialLayout = isResumeLayout(savedLayout) ? savedLayout : 'creative';

  setLayout(resumeElement, layoutSelect, initialLayout);
  layoutSelect?.addEventListener('change', () => {
    setLayout(resumeElement, layoutSelect, layoutSelect.value as ResumeLayout);
  });
}
