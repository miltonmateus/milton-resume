import { editableElementsSelector } from '../../constants/editing';

export { editableElementsSelector };

export function prepareEditableEntry(entry: HTMLElement): void {
  entry.querySelectorAll<HTMLElement>(editableElementsSelector).forEach((element) => {
    element.contentEditable = 'true';
    element.spellcheck = true;
  });

  const firstField = entry.querySelector<HTMLElement>('h3, p, li');
  firstField?.focus();
  if (firstField) document.getSelection()?.selectAllChildren(firstField);
}
