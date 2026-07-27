import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { ResumeLocale } from '../../../types/resume';

@Component({
  selector: 'app-locale-switcher',
  imports: [CommonModule],
  templateUrl: './locale-switcher.component.html',
})
export class LocaleSwitcherComponent {
  @Input({ required: true }) locale!: ResumeLocale;

  @Output() localeChange = new EventEmitter<ResumeLocale>();

  readonly localeOptions: Array<{ value: ResumeLocale; label: string }> = [
    { value: 'pt-BR', label: 'PT-BR' },
    { value: 'en-US', label: 'EN-US' },
  ];
}
