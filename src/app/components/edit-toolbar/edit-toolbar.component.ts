import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import type { ElementRef } from '@angular/core';

import { allowedProfileImageTypes, maxProfileImageSizeInBytes } from '../../../constants/editing';

@Component({
  selector: 'app-edit-toolbar',
  imports: [],
  templateUrl: './edit-toolbar.component.html',
})
export class EditToolbarComponent {
  @ViewChild('photoInput') private photoInput?: ElementRef<HTMLInputElement>;

  @Input({ required: true }) isEditing!: boolean;
  @Input() saveStatus = '';

  @Output() finishEditing = new EventEmitter<void>();
  @Output() resetResume = new EventEmitter<void>();
  @Output() photoSelected = new EventEmitter<string>();
  @Output() exportResume = new EventEmitter<void>();
  @Output() resumeImported = new EventEmitter<string>();

  openPhotoPicker(): void {
    this.photoInput?.nativeElement.click();
  }

  updatePhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!allowedProfileImageTypes.includes(file.type as (typeof allowedProfileImageTypes)[number])) {
      window.alert('Escolha uma imagem em PNG, JPG ou WebP.');
      input.value = '';
      return;
    }

    if (file.size > maxProfileImageSizeInBytes) {
      window.alert('Escolha uma imagem com até 2 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') this.photoSelected.emit(reader.result);
    });
    reader.readAsDataURL(file);
  }

  importResume(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.type && file.type !== 'application/json') {
      window.alert('Escolha um arquivo JSON exportado pelo currículo.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') this.resumeImported.emit(reader.result);
      input.value = '';
    });
    reader.readAsText(file);
  }
}
