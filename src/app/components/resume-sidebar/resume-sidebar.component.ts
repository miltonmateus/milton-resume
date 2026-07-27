import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { ResumeUiCopy } from '../../../data/ui-copy.data';
import type { Resume, SkillGroup } from '../../../types/resume';
import { HintComponent } from '../hint/hint.component';
import { ItemActionsComponent } from '../item-actions/item-actions.component';

@Component({
  selector: 'app-resume-sidebar',
  imports: [CommonModule, HintComponent, ItemActionsComponent],
  templateUrl: './resume-sidebar.component.html',
})
export class ResumeSidebarComponent {
  @Input({ required: true }) resume!: Resume;
  @Input({ required: true }) isEditing!: boolean;
  @Input({ required: true }) copy!: ResumeUiCopy;

  @Output() changed = new EventEmitter<void>();
  @Output() changePhoto = new EventEmitter<void>();

  titleText(value: string): string {
    return value
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  linkLabel(value: string): string {
    return value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  }

  externalTarget(value: string): string | null {
    return value.startsWith('http') ? '_blank' : null;
  }

  languageWidth(level: string): string {
    const levels: Record<string, string> = {
      Básico: '25%',
      Basic: '25%',
      Intermediário: '50%',
      Intermediate: '50%',
      Avançado: '72%',
      Advanced: '72%',
      Fluente: '88%',
      Fluent: '88%',
      Nativo: '100%',
      Native: '100%',
    };

    return levels[level] ?? '45%';
  }

  updateText<T extends object>(event: Event, target: T, key: keyof T): void {
    const value = (event.target as HTMLElement).textContent ?? '';
    target[key] = value as T[keyof T];
    this.changed.emit();
  }

  updateArrayText(items: string[], index: number, event: Event): void {
    items[index] = (event.target as HTMLElement).textContent ?? '';
    this.changed.emit();
  }

  preventLinkWhenEditing(event: MouseEvent): void {
    if (!this.isEditing) return;
    event.preventDefault();
  }

  addSkill(group: SkillGroup): void {
    group.skills.push(this.copy.placeholders.skill);
    this.changed.emit();
  }

  removeSkill(group: SkillGroup, index: number): void {
    group.skills.splice(index, 1);
    this.changed.emit();
  }

  removeLanguage(index: number): void {
    this.resume.languages.splice(index, 1);
    this.changed.emit();
  }

  addLanguage(): void {
    const name = window.prompt(this.copy.placeholders.languageNamePrompt)?.trim();
    if (!name) return;

    const level = this.normalizeLanguageLevel(
      window.prompt(
        `${this.copy.placeholders.languageLevelPrompt} (${this.copy.languageLevels.join(', ')}):`,
        this.copy.placeholders.languageLevelDefault,
      ) ?? '',
    );

    if (!level) {
      window.alert(`${this.copy.placeholders.languageInvalidLevel} ${this.copy.languageLevels.join(', ')}.`);
      return;
    }

    this.resume.languages.push({ name, level });
    this.changed.emit();
  }

  private normalizeLanguageLevel(level: string): string | null {
    const normalizedLevel = level
      .trim()
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return (
      this.copy.languageLevels.find((option) => {
        const normalizedOption = option
          .toLocaleLowerCase('pt-BR')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return normalizedOption === normalizedLevel;
      }) ?? null
    );
  }
}
