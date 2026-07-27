import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { Highlight } from '../../../types/resume';
import { ItemActionsComponent } from '../item-actions/item-actions.component';

@Component({
  selector: 'app-resume-highlights',
  imports: [CommonModule, ItemActionsComponent],
  templateUrl: './resume-highlights.component.html',
})
export class ResumeHighlightsComponent {
  @Input({ required: true }) highlights!: Highlight[];
  @Input({ required: true }) isEditing!: boolean;

  @Output() changed = new EventEmitter<void>();

  updateText<T extends object>(event: Event, target: T, key: keyof T): void {
    const value = (event.target as HTMLElement).textContent ?? '';
    target[key] = value as T[keyof T];
    this.changed.emit();
  }

  addHighlight(): void {
    this.highlights.push({
      icon: 'lightbulb',
      title: 'Novo destaque',
      description: 'Descreva uma qualidade, conquista ou diferencial profissional.',
    });
    this.changed.emit();
  }

  removeHighlight(index: number): void {
    this.highlights.splice(index, 1);
    this.changed.emit();
  }

  moveHighlight(index: number, direction: -1 | 1): void {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.highlights.length) return;

    [this.highlights[index], this.highlights[targetIndex]] = [
      this.highlights[targetIndex],
      this.highlights[index],
    ];
    this.changed.emit();
  }
}
