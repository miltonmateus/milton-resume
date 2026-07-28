import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import type { OnChanges } from '@angular/core';
import type { ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { ResumeUiCopy } from '../../../data/ui-copy.data';
import type { Experience, ResumeIconName } from '../../../types/resume';

interface ExperienceForm {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  icon: ResumeIconName;
}

@Component({
  selector: 'app-experience-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './experience-dialog.component.html',
})
export class ExperienceDialogComponent implements OnChanges {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;

  @Input({ required: true }) copy!: ResumeUiCopy['dialogs'];
  @Input({ required: true }) placeholders!: ResumeUiCopy['placeholders'];

  @Output() experienceCreated = new EventEmitter<Experience>();

  experienceIconOptions: Array<{ value: ResumeIconName; label: string }> = [];
  experienceForm = this.createBlankExperienceForm();

  ngOnChanges(): void {
    const labels = this.copy.experienceIconLabels;

    this.experienceIconOptions = [
      { value: 'building-2', label: labels.company },
      { value: 'code-xml', label: labels.development },
      { value: 'server-cog', label: labels.backend },
      { value: 'monitor-smartphone', label: labels.frontend },
      { value: 'database', label: labels.data },
      { value: 'users-round', label: labels.team },
      { value: 'shield-check', label: labels.quality },
      { value: 'wrench', label: labels.operations },
    ];
  }

  show(): void {
    this.experienceForm = this.createBlankExperienceForm();
    this.dialog?.nativeElement.showModal();
  }

  close(): void {
    this.dialog?.nativeElement.close();
  }

  addExperience(): void {
    if (!this.experienceForm.current && this.experienceForm.endDate < this.experienceForm.startDate) {
      window.alert(this.placeholders.invalidExperienceDate);
      return;
    }

    this.experienceCreated.emit({
      company: this.experienceForm.company.trim(),
      role: this.experienceForm.role.trim(),
      location: this.experienceForm.location.trim(),
      icon: this.experienceForm.icon,
      startDate: this.formatMonth(this.experienceForm.startDate),
      endDate: this.experienceForm.current
        ? this.placeholders.currentExperienceEnd
        : this.formatMonth(this.experienceForm.endDate),
      description: [this.placeholders.experienceDescription],
    });
    this.close();
  }

  private createBlankExperienceForm(): ExperienceForm {
    return {
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      icon: 'building-2',
    };
  }

  private formatMonth(value: string): string {
    if (!value) return '';

    const [year, month] = value.split('-');
    if (!year || !month) return value;

    return `${month}/${year}`;
  }
}
