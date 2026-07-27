import { Injectable } from '@angular/core';

import { storageKeys } from '../../constants/storage';
import { resume as exampleResume } from '../../data/resume.data';
import type { Resume } from '../../types/resume';

const currentResumeStorageVersion = 1;

export interface PersistedResumeDocument {
  version: typeof currentResumeStorageVersion;
  resume: Resume;
  savedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ResumeStorageService {
  readonly exportFileName = 'milton-resume.json';

  load(): Resume {
    const fallbackResume = this.cloneResume(exampleResume);
    const savedResume = this.getStoredValue(storageKeys.customizedResumeData);
    if (!savedResume) return fallbackResume;

    try {
      const parsedValue: unknown = JSON.parse(savedResume);
      return this.normalizeResume(this.readResumeFromDocument(parsedValue), fallbackResume);
    } catch {
      return fallbackResume;
    }
  }

  hasSavedResume(): boolean {
    return this.getStoredValue(storageKeys.customizedResumeData) !== null;
  }

  save(resume: Resume): boolean {
    const persistedDocument: PersistedResumeDocument = {
      version: currentResumeStorageVersion,
      resume,
      savedAt: new Date().toISOString(),
    };

    return this.setStoredValue(storageKeys.customizedResumeData, JSON.stringify(persistedDocument));
  }

  clear(): void {
    this.removeStoredValue(storageKeys.customizedResumeData);
    this.removeStoredValue(storageKeys.customizedResumeMarkup);
  }

  exportResume(resume: Resume): void {
    const persistedDocument: PersistedResumeDocument = {
      version: currentResumeStorageVersion,
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

  parseImportedResume(value: string): Resume {
    const fallbackResume = this.cloneResume(exampleResume);
    const parsedValue: unknown = JSON.parse(value);
    return this.normalizeResume(this.readResumeFromDocument(parsedValue), fallbackResume);
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
