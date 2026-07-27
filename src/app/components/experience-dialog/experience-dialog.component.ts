import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import type { ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
export class ExperienceDialogComponent {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;

  @Output() experienceCreated = new EventEmitter<Experience>();

  readonly experienceIconOptions: Array<{ value: ResumeIconName; label: string }> = [
    { value: 'building-2', label: 'Empresa' },
    { value: 'code-xml', label: 'Desenvolvimento' },
    { value: 'server-cog', label: 'Backend' },
    { value: 'monitor-smartphone', label: 'Frontend' },
    { value: 'database', label: 'Dados' },
    { value: 'users-round', label: 'Equipe' },
    { value: 'shield-check', label: 'Qualidade' },
    { value: 'wrench', label: 'Operações' },
  ];

  experienceForm = this.createBlankExperienceForm();

  show(): void {
    this.experienceForm = this.createBlankExperienceForm();
    this.dialog?.nativeElement.showModal();
  }

  close(): void {
    this.dialog?.nativeElement.close();
  }

  addExperience(): void {
    if (!this.experienceForm.current && this.experienceForm.endDate < this.experienceForm.startDate) {
      window.alert('A data final deve ser posterior à data inicial.');
      return;
    }

    this.experienceCreated.emit({
      company: this.experienceForm.company.trim(),
      role: this.experienceForm.role.trim(),
      location: this.experienceForm.location.trim(),
      icon: this.experienceForm.icon,
      startDate: this.formatMonth(this.experienceForm.startDate),
      endDate: this.experienceForm.current ? 'Atual' : this.formatMonth(this.experienceForm.endDate),
      description: ['Descreva sua principal atividade ou resultado.'],
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
