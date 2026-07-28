import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import type { AfterViewChecked } from '@angular/core';

import { refreshResumeIcons } from '../features/icons/resume-icons';
import type { Experience, Resume } from '../types/resume';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditToolbarComponent } from './components/edit-toolbar/edit-toolbar.component';
import { ExperienceDialogComponent } from './components/experience-dialog/experience-dialog.component';
import { LocaleSwitcherComponent } from './components/locale-switcher/locale-switcher.component';
import { ResumeActionsComponent } from './components/resume-actions/resume-actions.component';
import { ResumeContentComponent } from './components/resume-content/resume-content.component';
import { ResumeHighlightsComponent } from './components/resume-highlights/resume-highlights.component';
import { ResumeSidebarComponent } from './components/resume-sidebar/resume-sidebar.component';
import { StartDialogComponent } from './components/start-dialog/start-dialog.component';
import { ResumeLayoutService } from './services/resume-layout.service';
import type { ResumeLayout } from './services/resume-layout.service';
import { ResumeStoreService } from './services/resume-store.service';
import type { ResumeLocale } from '../types/resume';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    EditToolbarComponent,
    ExperienceDialogComponent,
    LocaleSwitcherComponent,
    ResumeActionsComponent,
    ResumeContentComponent,
    ResumeHighlightsComponent,
    ResumeSidebarComponent,
    StartDialogComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewChecked {
  readonly resumeStore = inject(ResumeStoreService);
  private readonly resumeLayout = inject(ResumeLayoutService);

  @ViewChild('startDialog') private startDialog?: StartDialogComponent;
  @ViewChild('restoreDialog') private restoreDialog?: ConfirmDialogComponent;
  @ViewChild('experienceDialog') private experienceDialog?: ExperienceDialogComponent;
  @ViewChild(EditToolbarComponent) private editToolbar?: EditToolbarComponent;

  layout: ResumeLayout = this.resumeLayout.load();
  isEditing = false;

  get currentResume(): Resume {
    return this.resumeStore.resume();
  }

  get currentLocale(): ResumeLocale {
    return this.resumeStore.locale();
  }

  get copy() {
    return this.resumeStore.copy();
  }

  get hasCustomizedResume(): boolean {
    return this.resumeStore.canRestoreOriginal();
  }

  get saveStatus(): string {
    return this.resumeStore.saveStatus();
  }

  ngAfterViewChecked(): void {
    refreshResumeIcons();
  }

  get resumeClasses(): Record<string, boolean> {
    return {
      'resume--editing': this.isEditing,
      'resume--executive': this.layout === 'executive',
      'resume--dark': this.layout === 'dark',
      'resume--studio': this.layout === 'studio',
    };
  }

  setLayout(layout: ResumeLayout): void {
    this.layout = layout;
    this.resumeLayout.save(layout);
  }

  printResume(): void {
    window.print();
  }

  openStartDialog(): void {
    if (this.isEditing) {
      this.finishEditing();
      return;
    }

    this.startDialog?.show();
  }

  startFromExample(): void {
    this.startDialog?.close();
    this.isEditing = true;
  }

  startBlank(): void {
    this.resumeStore.startBlank();
    this.startDialog?.close();
    this.isEditing = true;
  }

  finishEditing(): void {
    this.isEditing = false;
    this.saveResume();
  }

  restoreOriginal(): void {
    this.resumeStore.restoreOriginal();
    this.isEditing = false;
  }

  resetResume(): void {
    this.restoreDialog?.show();
  }

  changeLocale(locale: ResumeLocale): void {
    if (locale === this.currentLocale) return;
    if (this.hasCustomizedResume && !window.confirm(this.copy.messages.switchCustomizedConfirm)) return;

    this.resumeStore.setLocale(locale);
    this.isEditing = false;
  }

  openExperienceDialog(): void {
    this.experienceDialog?.show();
  }

  addExperience(experience: Experience): void {
    this.resumeStore.update((resume) => {
      resume.experience.push(experience);
    });
  }

  openPhotoPicker(): void {
    this.editToolbar?.openPhotoPicker();
  }

  updatePhoto(profileImage: string): void {
    this.resumeStore.update((resume) => {
      resume.personal.profileImage = profileImage;
    });
  }

  exportResume(): void {
    this.resumeStore.exportCurrentResume();
  }

  importResume(fileContent: string): void {
    try {
      this.resumeStore.importResume(fileContent);
    } catch {
      window.alert(this.copy.messages.importError);
    }
  }

  saveResume(): void {
    this.resumeStore.saveCurrent();
  }
}
