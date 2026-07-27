import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { ResumeLayout } from '../../services/resume-layout.service';

@Component({
  selector: 'app-resume-actions',
  imports: [FormsModule],
  templateUrl: './resume-actions.component.html',
})
export class ResumeActionsComponent {
  @Input({ required: true }) layout!: ResumeLayout;
  @Input({ required: true }) isEditing!: boolean;
  @Input({ required: true }) hasCustomizedResume!: boolean;

  @Output() layoutChange = new EventEmitter<ResumeLayout>();
  @Output() downloadPdf = new EventEmitter<void>();
  @Output() customize = new EventEmitter<void>();
  @Output() restoreOriginal = new EventEmitter<void>();
}
