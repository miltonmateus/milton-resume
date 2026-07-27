import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import type { AfterViewChecked } from '@angular/core';

import { refreshResumeIcons } from '../features/icons/resume-icons';
import type { Experience, Resume } from '../types/resume';
import { EditToolbarComponent } from './components/edit-toolbar/edit-toolbar.component';
import { ExperienceDialogComponent } from './components/experience-dialog/experience-dialog.component';
import { ResumeActionsComponent } from './components/resume-actions/resume-actions.component';
import { ResumeContentComponent } from './components/resume-content/resume-content.component';
import { ResumeHighlightsComponent } from './components/resume-highlights/resume-highlights.component';
import { ResumeSidebarComponent } from './components/resume-sidebar/resume-sidebar.component';
import { StartDialogComponent } from './components/start-dialog/start-dialog.component';
import { ResumeLayoutService } from './services/resume-layout.service';
import type { ResumeLayout } from './services/resume-layout.service';
import { ResumeStoreService } from './services/resume-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EditToolbarComponent,
    ExperienceDialogComponent,
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
  @ViewChild('experienceDialog') private experienceDialog?: ExperienceDialogComponent;
  @ViewChild(EditToolbarComponent) private editToolbar?: EditToolbarComponent;

  layout: ResumeLayout = this.resumeLayout.load();
  isEditing = false;

  get currentResume(): Resume {
    return this.resumeStore.resume();
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
    if (!window.confirm('Restaurar todo o conteúdo original do currículo?')) return;
    this.restoreOriginal();
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
      window.alert('Não foi possível importar este arquivo JSON.');
    }
  }

  saveResume(): void {
    this.resumeStore.saveCurrent();
  }
}
