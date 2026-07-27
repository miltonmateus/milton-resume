import { beforeEach, describe, expect, it } from 'vitest';

import { storageKeys } from '../../constants/storage';
import { resume } from '../../data/resume.data';
import { ResumeStorageService } from './resume-storage.service';

describe('ResumeStorageService', () => {
  let service: ResumeStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = new ResumeStorageService();
  });

  it('loads the default resume when storage is empty', () => {
    expect(service.load().personal.fullName).toBe(resume.personal.fullName);
  });

  it('saves a versioned resume document', () => {
    expect(service.save(resume)).toBe(true);

    const savedValue = localStorage.getItem(storageKeys.customizedResumeData);
    expect(savedValue).not.toBeNull();
    expect(JSON.parse(savedValue ?? '{}')).toMatchObject({
      version: 1,
      resume: {
        personal: {
          fullName: resume.personal.fullName,
        },
      },
    });
  });

  it('parses imported versioned documents', () => {
    const importedResume = service.parseImportedResume(
      JSON.stringify({
        version: 1,
        resume: {
          ...resume,
          personal: {
            ...resume.personal,
            fullName: 'Pessoa Importada',
          },
        },
      }),
    );

    expect(importedResume.personal.fullName).toBe('Pessoa Importada');
    expect(importedResume.skills.length).toBeGreaterThan(0);
  });

  it('normalizes partial imported documents using defaults', () => {
    const importedResume = service.parseImportedResume(
      JSON.stringify({
        personal: {
          fullName: 'Parcial',
        },
      }),
    );

    expect(importedResume.personal.fullName).toBe('Parcial');
    expect(importedResume.personal.email).toBe(resume.personal.email);
    expect(importedResume.experience.length).toBe(resume.experience.length);
  });
});
