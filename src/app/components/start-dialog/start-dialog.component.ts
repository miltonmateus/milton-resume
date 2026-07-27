import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import type { ElementRef } from '@angular/core';

import type { ResumeUiCopy } from '../../../data/ui-copy.data';

@Component({
  selector: 'app-start-dialog',
  imports: [],
  templateUrl: './start-dialog.component.html',
})
export class StartDialogComponent {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;

  @Input({ required: true }) copy!: ResumeUiCopy['dialogs'];

  @Output() startExample = new EventEmitter<void>();
  @Output() startBlank = new EventEmitter<void>();

  show(): void {
    this.dialog?.nativeElement.showModal();
  }

  close(): void {
    this.dialog?.nativeElement.close();
  }
}
