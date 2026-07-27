import { beforeEach, describe, expect, it } from 'vitest';

import { storageKeys } from '../../constants/storage';
import { resume, resumesByLocale } from '../../data/resume.data';
import { ResumeStorageService } from './resume-storage.service';

const ptBrStorageKey = `${storageKeys.customizedResumeData}:pt-BR`;

describe('ResumeStorageService', () => {
  let service: ResumeStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = new ResumeStorageService();
  });

  it('loads the default resume when storage is empty', () => {
    expect(service.load('pt-BR').personal.fullName).toBe(resume.personal.fullName);
  });

  it('loads the English resume when the locale is en-US', () => {
    expect(service.load('en-US').summary.title).toBe(resumesByLocale['en-US'].summary.title);
  });

  it('saves a versioned resume document', () => {
    expect(service.save('pt-BR', resume)).toBe(true);

    const savedValue = localStorage.getItem(ptBrStorageKey);
    expect(savedValue).not.toBeNull();
    expect(JSON.parse(savedValue ?? '{}')).toMatchObject({
      version: 1,
      locale: 'pt-BR',
      resume: {
        personal: {
          fullName: resume.personal.fullName,
        },
      },
    });
  });

  it('parses imported versioned documents', () => {
    const importedDocument = service.parseImportedResume(
      JSON.stringify({
        version: 1,
        locale: 'pt-BR',
        resume: {
          ...resume,
          personal: {
            ...resume.personal,
            fullName: 'Pessoa Importada',
          },
        },
      }),
    );

    expect(importedDocument.locale).toBe('pt-BR');
    expect(importedDocument.resume.personal.fullName).toBe('Pessoa Importada');
    expect(importedDocument.resume.skills.length).toBeGreaterThan(0);
  });

  it('normalizes partial imported documents using defaults', () => {
    const importedDocument = service.parseImportedResume(
      JSON.stringify({
        personal: {
          fullName: 'Parcial',
        },
      }),
    );

    expect(importedDocument.locale).toBe('pt-BR');
    expect(importedDocument.resume.personal.fullName).toBe('Parcial');
    expect(importedDocument.resume.personal.email).toBe(resume.personal.email);
    expect(importedDocument.resume.experience.length).toBe(resume.experience.length);
  });
});
