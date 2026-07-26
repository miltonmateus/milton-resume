import type { ResumeIconName } from '../types/resume';
import { escapeAttribute } from '../utils/html';

export function renderIcon(name: ResumeIconName, className?: string): string {
  const classAttribute = className ? ` class="${className}"` : '';
  return `<i${classAttribute} data-lucide="${escapeAttribute(name)}" aria-hidden="true" contenteditable="false"></i>`;
}
