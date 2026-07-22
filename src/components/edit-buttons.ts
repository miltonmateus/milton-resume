import { renderIcon } from './icon';

export function createEditButton(
  className: string,
  label: string,
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `${className} edit-only`;
  button.innerHTML = `${renderIcon('plus')} ${label}`;
  button.addEventListener('click', onClick);

  return button;
}
