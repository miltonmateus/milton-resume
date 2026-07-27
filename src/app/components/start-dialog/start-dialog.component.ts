import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import type { ElementRef } from '@angular/core';

@Component({
  selector: 'app-start-dialog',
  imports: [],
  templateUrl: './start-dialog.component.html',
})
export class StartDialogComponent {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;

  @Output() startExample = new EventEmitter<void>();
  @Output() startBlank = new EventEmitter<void>();

  show(): void {
    this.dialog?.nativeElement.showModal();
  }

  close(): void {
    this.dialog?.nativeElement.close();
  }
}
