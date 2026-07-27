import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { Certificate, Education, Experience, Resume } from '../../../types/resume';
import { ItemActionsComponent } from '../item-actions/item-actions.component';

@Component({
  selector: 'app-resume-content',
  imports: [CommonModule, ItemActionsComponent],
  templateUrl: './resume-content.component.html',
})
export class ResumeContentComponent {
  @Input({ required: true }) resume!: Resume;
  @Input({ required: true }) isEditing!: boolean;

  @Output() changed = new EventEmitter<void>();
  @Output() addExperienceRequested = new EventEmitter<void>();

  updateText<T extends object>(event: Event, target: T, key: keyof T): void {
    const value = (event.target as HTMLElement).textContent ?? '';
    target[key] = value as T[keyof T];
    this.changed.emit();
  }

  updateArrayText(items: string[], index: number, event: Event): void {
    items[index] = (event.target as HTMLElement).textContent ?? '';
    this.changed.emit();
  }

  updateExperiencePeriod(event: Event, item: Experience): void {
    const [startDate, endDate] = this.splitPeriod((event.target as HTMLElement).textContent ?? '');
    item.startDate = startDate;
    item.endDate = endDate;
    this.changed.emit();
  }

  updateEducationPeriod(event: Event, item: Education): void {
    const [startDate, endDate] = this.splitPeriod((event.target as HTMLElement).textContent ?? '');
    item.startDate = startDate;
    item.endDate = endDate;
    this.changed.emit();
  }

  updateCertificateIssuer(event: Event, item: Certificate): void {
    const [issuer, date] = ((event.target as HTMLElement).textContent ?? '')
      .split(' · ')
      .map((value) => value.trim());
    item.issuer = issuer ?? '';
    item.date = date || undefined;
    this.changed.emit();
  }

  preventLinkWhenEditing(event: MouseEvent): void {
    if (!this.isEditing) return;
    event.preventDefault();
  }

  addEducation(): void {
    this.resume.education.push({
      institution: 'Nome da instituição',
      course: 'Curso ou formação',
      startDate: 'Ano de início',
      endDate: 'Ano de conclusão',
      status: 'Situação do curso',
    });
    this.changed.emit();
  }

  addCertificate(): void {
    this.resume.certificates.push({
      title: 'Nome do certificado',
      issuer: 'Instituição emissora',
      date: 'Ano de emissão',
    });
    this.changed.emit();
  }

  removeExperience(index: number): void {
    this.resume.experience.splice(index, 1);
    this.changed.emit();
  }

  removeEducation(index: number): void {
    this.resume.education.splice(index, 1);
    this.changed.emit();
  }

  removeCertificate(index: number): void {
    this.resume.certificates.splice(index, 1);
    this.changed.emit();
  }

  moveExperience(index: number, direction: -1 | 1): void {
    this.moveItem(this.resume.experience, index, direction);
  }

  moveEducation(index: number, direction: -1 | 1): void {
    this.moveItem(this.resume.education, index, direction);
  }

  moveCertificate(index: number, direction: -1 | 1): void {
    this.moveItem(this.resume.certificates, index, direction);
  }

  private splitPeriod(value: string): [string, string] {
    const [startDate, endDate] = value.split('—').map((part) => part.trim());
    return [startDate ?? '', endDate ?? ''];
  }

  private moveItem<T>(items: T[], index: number, direction: -1 | 1): void {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
    this.changed.emit();
  }
}
