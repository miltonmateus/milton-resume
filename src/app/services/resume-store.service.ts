import { Injectable, computed, inject, signal } from '@angular/core';

import { blankResume, resume as exampleResume } from '../../data/resume.data';
import type { Resume } from '../../types/resume';
import { ResumeStorageService } from './resume-storage.service';

@Injectable({ providedIn: 'root' })
export class ResumeStoreService {
  private readonly resumeStorage = inject(ResumeStorageService);

  private readonly resumeSignal = signal<Resume>(this.resumeStorage.load());
  private readonly hasCustomizedResumeSignal = signal(this.resumeStorage.hasSavedResume());
  private readonly saveStatusSignal = signal('');

  readonly resume = this.resumeSignal.asReadonly();
  readonly hasCustomizedResume = this.hasCustomizedResumeSignal.asReadonly();
  readonly saveStatus = this.saveStatusSignal.asReadonly();
  readonly canRestoreOriginal = computed(() => this.hasCustomizedResumeSignal());

  update(mutator: (resume: Resume) => void): void {
    const nextResume = this.resumeStorage.cloneResume(this.resumeSignal());
    mutator(nextResume);
    this.resumeSignal.set(nextResume);
    this.save();
  }

  saveCurrent(): void {
    this.save();
  }

  replace(resume: Resume, shouldPersist = true): void {
    this.resumeSignal.set(this.resumeStorage.cloneResume(resume));
    if (shouldPersist) {
      this.save();
      return;
    }

    this.hasCustomizedResumeSignal.set(false);
  }

  startBlank(): void {
    this.resumeSignal.set(this.resumeStorage.cloneResume(blankResume));
    this.resumeStorage.clear();
    this.hasCustomizedResumeSignal.set(true);
  }

  restoreOriginal(): void {
    this.resumeSignal.set(this.resumeStorage.cloneResume(exampleResume));
    this.resumeStorage.clear();
    this.hasCustomizedResumeSignal.set(false);
    this.announce('Conteúdo original restaurado.');
  }

  exportCurrentResume(): void {
    this.resumeStorage.exportResume(this.resumeSignal());
  }

  importResume(fileContent: string): void {
    this.replace(this.resumeStorage.parseImportedResume(fileContent));
  }

  private save(): void {
    const didSave = this.resumeStorage.save(this.resumeSignal());
    this.hasCustomizedResumeSignal.set(true);
    this.announce(didSave ? 'Alterações salvas.' : 'Não foi possível salvar neste navegador.');
  }

  private announce(message: string): void {
    this.saveStatusSignal.set('');
    window.setTimeout(() => {
      this.saveStatusSignal.set(message);
    }, 20);
  }
}
