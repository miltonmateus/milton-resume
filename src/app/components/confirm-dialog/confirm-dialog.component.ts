import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import type { ElementRef } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;

  @Input({ required: true }) title = '';
  @Input({ required: true }) message = '';
  @Input({ required: true }) cancelLabel = '';
  @Input({ required: true }) confirmLabel = '';

  @Output() confirmed = new EventEmitter<void>();

  show(): void {
    this.dialog?.nativeElement.showModal();
  }

  close(): void {
    this.dialog?.nativeElement.close();
  }

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }
}
