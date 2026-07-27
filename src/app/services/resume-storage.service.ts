import { Injectable } from '@angular/core';

import { storageKeys } from '../../constants/storage';
import { defaultResumeLocale, resumesByLocale } from '../../data/resume.data';
import type { Resume, ResumeLocale } from '../../types/resume';

const currentResumeStorageVersion = 1;

export interface PersistedResumeDocument {
  version: typeof currentResumeStorageVersion;
  locale: ResumeLocale;
  resume: Resume;
  savedAt: string;
}

export interface ParsedImportedResume {
  locale: ResumeLocale;
  resume: Resume;
}

@Injectable({ providedIn: 'root' })
export class ResumeStorageService {
  readonly exportFileName = 'milton-resume.json';

  load(locale: ResumeLocale): Resume {
    const fallbackResume = this.cloneResume(resumesByLocale[locale]);
    const savedResume = this.getStoredValue(this.resumeStorageKey(locale));
    if (!savedResume) return fallbackResume;

    try {
      const parsedValue: unknown = JSON.parse(savedResume);
      return this.normalizeResume(this.readResumeFromDocument(parsedValue), fallbackResume);
    } catch {
      return fallbackResume;
    }
  }

  loadLocale(): ResumeLocale {
    const savedLocale = this.getStoredValue(storageKeys.resumeLocale);
    return this.isResumeLocale(savedLocale) ? savedLocale : defaultResumeLocale;
  }

  saveLocale(locale: ResumeLocale): void {
    this.setStoredValue(storageKeys.resumeLocale, locale);
  }

  hasSavedResume(locale: ResumeLocale): boolean {
    return this.getStoredValue(this.resumeStorageKey(locale)) !== null;
  }

  save(locale: ResumeLocale, resume: Resume): boolean {
    const persistedDocument: PersistedResumeDocument = {
      version: currentResumeStorageVersion,
      locale,
      resume,
      savedAt: new Date().toISOString(),
    };

    return this.setStoredValue(this.resumeStorageKey(locale), JSON.stringify(persistedDocument));
  }

  clear(locale: ResumeLocale): void {
    this.removeStoredValue(this.resumeStorageKey(locale));
    this.removeStoredValue(storageKeys.customizedResumeMarkup);
  }

  exportResume(locale: ResumeLocale, resume: Resume): void {
    const persistedDocument: PersistedResumeDocument = {
      version: currentResumeStorageVersion,
      locale,
      resume,
      savedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(persistedDocument, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = this.exportFileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  parseImportedResume(value: string): ParsedImportedResume {
    const parsedValue: unknown = JSON.parse(value);
    const locale = this.readLocaleFromDocument(parsedValue);
    const fallbackResume = this.cloneResume(resumesByLocale[locale]);

    return {
      locale,
      resume: this.normalizeResume(this.readResumeFromDocument(parsedValue), fallbackResume),
    };
  }

  cloneResume(source: Resume): Resume {
    return structuredClone(source);
  }

  private readResumeFromDocument(value: unknown): unknown {
    if (!this.isRecord(value)) return value;

    if ('version' in value && 'resume' in value) {
      return value.resume;
    }

    return value;
  }

  private readLocaleFromDocument(value: unknown): ResumeLocale {
    if (!this.isRecord(value)) return defaultResumeLocale;

    return this.isResumeLocale(value.locale) ? value.locale : defaultResumeLocale;
  }

  private normalizeResume(value: unknown, fallback: Resume): Resume {
    if (!this.isRecord(value)) return fallback;

    const resumeValue = value as Partial<Resume>;

    return {
      personal: {
        ...fallback.personal,
        ...(this.isRecord(resumeValue.personal) ? resumeValue.personal : {}),
      },
      summary: {
        ...fallback.summary,
        ...(this.isRecord(resumeValue.summary) ? resumeValue.summary : {}),
        paragraphs: Array.isArray(resumeValue.summary?.paragraphs)
          ? resumeValue.summary.paragraphs
          : fallback.summary.paragraphs,
      },
      skills: Array.isArray(resumeValue.skills) ? resumeValue.skills : fallback.skills,
      experience: Array.isArray(resumeValue.experience) ? resumeValue.experience : fallback.experience,
      education: Array.isArray(resumeValue.education) ? resumeValue.education : fallback.education,
      certificates: Array.isArray(resumeValue.certificates)
        ? resumeValue.certificates
        : fallback.certificates,
      languages: Array.isArray(resumeValue.languages) ? resumeValue.languages : fallback.languages,
      highlights: Array.isArray(resumeValue.highlights) ? resumeValue.highlights : fallback.highlights,
    };
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  private isResumeLocale(value: unknown): value is ResumeLocale {
    return value === 'pt-BR' || value === 'en-US';
  }

  private resumeStorageKey(locale: ResumeLocale): string {
    return `${storageKeys.customizedResumeData}:${locale}`;
  }

  private getStoredValue(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private setStoredValue(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      this.removeStoredValue(storageKeys.customizedResumeMarkup);
      return true;
    } catch {
      return false;
    }
  }

  private removeStoredValue(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  }
}
