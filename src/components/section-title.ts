import { renderIcon } from './icon';
import type { ResumeIconName } from '../types/resume';
import { escapeHtml } from '../utils/html';

interface SectionTitleOptions {
  icon: ResumeIconName | string;
  label: string;
  iconClassName?: string;
  useLucide?: boolean;
}

export function renderSectionTitle({
  icon,
  label,
  iconClassName = 'section-icon',
  useLucide = true,
}: SectionTitleOptions): string {
  const renderedIcon = useLucide
    ? renderIcon(icon as ResumeIconName, iconClassName)
    : `<span class="${iconClassName}">${escapeHtml(icon)}</span>`;

  return `<h2>${renderedIcon}${escapeHtml(label)}</h2>`;
}
