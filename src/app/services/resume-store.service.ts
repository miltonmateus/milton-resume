import { Injectable, computed, inject, signal } from '@angular/core';

import { blankResumesByLocale, resumesByLocale } from '../../data/resume.data';
import { uiCopyByLocale } from '../../data/ui-copy.data';
import type { Resume, ResumeLocale } from '../../types/resume';
import { ResumeStorageService } from './resume-storage.service';

@Injectable({ providedIn: 'root' })
export class ResumeStoreService {
  private readonly resumeStorage = inject(ResumeStorageService);
  private readonly localeSignal = signal<ResumeLocale>(this.resumeStorage.loadLocale());

  private readonly resumeSignal = signal<Resume>(this.resumeStorage.load(this.localeSignal()));
  private readonly hasCustomizedResumeSignal = signal(this.resumeStorage.hasSavedResume(this.localeSignal()));
  private readonly saveStatusSignal = signal('');

  readonly locale = this.localeSignal.asReadonly();
  readonly resume = this.resumeSignal.asReadonly();
  readonly hasCustomizedResume = this.hasCustomizedResumeSignal.asReadonly();
  readonly saveStatus = this.saveStatusSignal.asReadonly();
  readonly copy = computed(() => uiCopyByLocale[this.localeSignal()]);
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
    this.resumeSignal.set(this.resumeStorage.cloneResume(blankResumesByLocale[this.localeSignal()]));
    this.resumeStorage.clear(this.localeSignal());
    this.hasCustomizedResumeSignal.set(true);
  }

  restoreOriginal(): void {
    this.resumeSignal.set(this.resumeStorage.cloneResume(resumesByLocale[this.localeSignal()]));
    this.resumeStorage.clear(this.localeSignal());
    this.hasCustomizedResumeSignal.set(false);
    this.announce(this.copy().messages.restored);
  }

  exportCurrentResume(): void {
    this.resumeStorage.exportResume(this.localeSignal(), this.resumeSignal());
  }

  importResume(fileContent: string): void {
    const importedDocument = this.resumeStorage.parseImportedResume(fileContent);
    this.setLocale(importedDocument.locale, false);
    this.replace(importedDocument.resume);
  }

  setLocale(locale: ResumeLocale, shouldAnnounce = true): void {
    if (locale === this.localeSignal()) return;

    if (this.hasCustomizedResumeSignal()) this.saveCurrent();
    this.localeSignal.set(locale);
    this.resumeStorage.saveLocale(locale);
    this.resumeSignal.set(this.resumeStorage.load(locale));
    this.hasCustomizedResumeSignal.set(this.resumeStorage.hasSavedResume(locale));
    if (shouldAnnounce) this.announce(this.copy().messages.saved);
  }

  private save(): void {
    const didSave = this.resumeStorage.save(this.localeSignal(), this.resumeSignal());
    this.hasCustomizedResumeSignal.set(true);
    this.announce(didSave ? this.copy().messages.saved : this.copy().messages.saveFailed);
  }

  private announce(message: string): void {
    this.saveStatusSignal.set('');
    window.setTimeout(() => {
      this.saveStatusSignal.set(message);
    }, 20);
  }
}
