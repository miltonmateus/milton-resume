import type { ResumeLocale } from '../types/resume';

export interface ResumeUiCopy {
  localeName: string;
  actions: {
    layout: string;
    layouts: {
      default: string;
      executive: string;
      dark: string;
      studio: string;
    };
    downloadPdf: string;
    restoreOriginal: string;
    customize: string;
    editing: string;
  };
  toolbar: {
    instructions: string;
    changePhoto: string;
    importJson: string;
    exportJson: string;
    restore: string;
    finish: string;
  };
  dialogs: {
    close: string;
    startTitle: string;
    startDescription: string;
    useExample: string;
    useExampleDescription: string;
    startBlank: string;
    startBlankDescription: string;
    experienceTitle: string;
    experienceName: string;
    experienceNamePlaceholder: string;
    icon: string;
    role: string;
    rolePlaceholder: string;
    location: string;
    locationPlaceholder: string;
    start: string;
    end: string;
    current: string;
    cancel: string;
    add: string;
  };
  sections: {
    contact: string;
    skills: string;
    languages: string;
    experience: string;
    education: string;
    certificates: string;
    highlights: string;
  };
  editing: {
    addExperience: string;
    addEducation: string;
    addCertificate: string;
    addHighlight: string;
    addSkill: string;
    addLanguage: string;
    removeSkillHint: string;
    removeLanguageLabel: string;
    removeLanguageHint: string;
    moveExperienceUp: string;
    moveExperienceDown: string;
    removeExperience: string;
    moveEducationUp: string;
    moveEducationDown: string;
    removeEducation: string;
    moveCertificateUp: string;
    moveCertificateDown: string;
    removeCertificate: string;
    moveHighlightUp: string;
    moveHighlightDown: string;
    removeHighlight: string;
  };
  links: {
    credential: string;
  };
  messages: {
    restoreConfirm: string;
    importError: string;
    restored: string;
    saved: string;
    saveFailed: string;
    switchCustomizedConfirm: string;
  };
  placeholders: {
    educationInstitution: string;
    educationCourse: string;
    educationStart: string;
    educationEnd: string;
    educationStatus: string;
    certificateTitle: string;
    certificateIssuer: string;
    certificateDate: string;
    highlightTitle: string;
    highlightDescription: string;
    skill: string;
    languageNamePrompt: string;
    languageLevelPrompt: string;
    languageLevelDefault: string;
    languageInvalidLevel: string;
    experienceDescription: string;
    currentExperienceEnd: string;
    invalidExperienceDate: string;
  };
  languageLevels: string[];
}

export const uiCopyByLocale: Record<ResumeLocale, ResumeUiCopy> = {
  'pt-BR': {
    localeName: 'Português',
    actions: {
      layout: 'Layout',
      layouts: {
        default: 'Clássico',
        executive: 'Executivo',
        dark: 'Dark',
        studio: 'Studio',
      },
      downloadPdf: 'Baixar PDF',
      restoreOriginal: 'Voltar ao original',
      customize: 'Crie seu currículo',
      editing: 'Editando currículo',
    },
    toolbar: {
      instructions:
        'Edite os textos diretamente no currículo. As alterações são salvas automaticamente neste navegador.',
      changePhoto: 'Trocar foto',
      importJson: 'Importar JSON',
      exportJson: 'Exportar JSON',
      restore: 'Restaurar',
      finish: 'Concluir',
    },
    dialogs: {
      close: 'Fechar',
      startTitle: 'Como você quer começar?',
      startDescription:
        'Use o currículo atual como base ou comece com campos genéricos para preencher do zero.',
      useExample: 'Usar este exemplo',
      useExampleDescription:
        'Editar o currículo atual mantendo a estrutura e os conteúdos como ponto de partida.',
      startBlank: 'Começar em branco',
      startBlankDescription: 'Substituir o conteúdo por placeholders editáveis para montar outro currículo.',
      experienceTitle: 'Adicionar experiência',
      experienceName: 'Nome da experiência',
      experienceNamePlaceholder: 'Empresa, projeto ou organização',
      icon: 'Ícone',
      role: 'Cargo ou função',
      rolePlaceholder: 'Desenvolvedor Full Stack',
      location: 'Local',
      locationPlaceholder: 'Porto Alegre - RS',
      start: 'Início',
      end: 'Fim',
      current: 'Trabalho aqui atualmente',
      cancel: 'Cancelar',
      add: 'Adicionar',
    },
    sections: {
      contact: 'Contato',
      skills: 'Competências',
      languages: 'Idiomas',
      experience: 'Experiência',
      education: 'Formação',
      certificates: 'Certificados',
      highlights: 'Destaques',
    },
    editing: {
      addExperience: 'Adicionar experiência',
      addEducation: 'Adicionar formação',
      addCertificate: 'Adicionar certificado',
      addHighlight: 'Adicionar destaque',
      addSkill: 'Adicionar competência',
      addLanguage: 'Adicionar idioma',
      removeSkillHint: 'Remove esta competência do currículo.',
      removeLanguageLabel: 'Remover idioma',
      removeLanguageHint: 'Remove este idioma do currículo.',
      moveExperienceUp: 'Mover experiência para cima',
      moveExperienceDown: 'Mover experiência para baixo',
      removeExperience: 'Remover experiência',
      moveEducationUp: 'Mover formação para cima',
      moveEducationDown: 'Mover formação para baixo',
      removeEducation: 'Remover formação',
      moveCertificateUp: 'Mover certificado para cima',
      moveCertificateDown: 'Mover certificado para baixo',
      removeCertificate: 'Remover certificado',
      moveHighlightUp: 'Mover destaque para a esquerda',
      moveHighlightDown: 'Mover destaque para a direita',
      removeHighlight: 'Remover destaque',
    },
    links: {
      credential: 'Ver credencial',
    },
    messages: {
      restoreConfirm: 'Restaurar todo o conteúdo original do currículo?',
      importError: 'Não foi possível importar este arquivo JSON.',
      restored: 'Conteúdo original restaurado.',
      saved: 'Alterações salvas.',
      saveFailed: 'Não foi possível salvar neste navegador.',
      switchCustomizedConfirm:
        'Trocar idioma vai carregar a versão salva/original deste idioma. Alterações não salvas já foram preservadas no idioma atual. Continuar?',
    },
    placeholders: {
      educationInstitution: 'Nome da instituição',
      educationCourse: 'Curso ou formação',
      educationStart: 'Ano de início',
      educationEnd: 'Ano de conclusão',
      educationStatus: 'Situação do curso',
      certificateTitle: 'Nome do certificado',
      certificateIssuer: 'Instituição emissora',
      certificateDate: 'Ano de emissão',
      highlightTitle: 'Novo destaque',
      highlightDescription: 'Descreva uma qualidade, conquista ou diferencial profissional.',
      skill: 'Nova competência',
      languageNamePrompt: 'Nome do idioma:',
      languageLevelPrompt: 'Nível do idioma',
      languageLevelDefault: 'Básico',
      languageInvalidLevel: 'Escolha um nível válido:',
      experienceDescription: 'Descreva sua principal atividade ou resultado.',
      currentExperienceEnd: 'Atual',
      invalidExperienceDate: 'A data final deve ser posterior à data inicial.',
    },
    languageLevels: ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'],
  },
  'en-US': {
    localeName: 'English',
    actions: {
      layout: 'Layout',
      layouts: {
        default: 'Classic',
        executive: 'Executive',
        dark: 'Dark',
        studio: 'Studio',
      },
      downloadPdf: 'Download PDF',
      restoreOriginal: 'Restore original',
      customize: 'Create your resume',
      editing: 'Editing resume',
    },
    toolbar: {
      instructions: 'Edit the resume text directly. Changes are saved automatically in this browser.',
      changePhoto: 'Change photo',
      importJson: 'Import JSON',
      exportJson: 'Export JSON',
      restore: 'Restore',
      finish: 'Done',
    },
    dialogs: {
      close: 'Close',
      startTitle: 'How do you want to start?',
      startDescription: 'Use the current resume as a base or start from generic editable fields.',
      useExample: 'Use this example',
      useExampleDescription:
        'Edit the current resume while keeping its structure and content as a starting point.',
      startBlank: 'Start blank',
      startBlankDescription: 'Replace the content with editable placeholders to build another resume.',
      experienceTitle: 'Add experience',
      experienceName: 'Experience name',
      experienceNamePlaceholder: 'Company, project, or organization',
      icon: 'Icon',
      role: 'Role or position',
      rolePlaceholder: 'Full Stack Developer',
      location: 'Location',
      locationPlaceholder: 'Porto Alegre, RS, Brazil',
      start: 'Start',
      end: 'End',
      current: 'I currently work here',
      cancel: 'Cancel',
      add: 'Add',
    },
    sections: {
      contact: 'Contact',
      skills: 'Skills',
      languages: 'Languages',
      experience: 'Experience',
      education: 'Education',
      certificates: 'Certificates',
      highlights: 'Highlights',
    },
    editing: {
      addExperience: 'Add experience',
      addEducation: 'Add education',
      addCertificate: 'Add certificate',
      addHighlight: 'Add highlight',
      addSkill: 'Add skill',
      addLanguage: 'Add language',
      removeSkillHint: 'Remove this skill from the resume.',
      removeLanguageLabel: 'Remove language',
      removeLanguageHint: 'Remove this language from the resume.',
      moveExperienceUp: 'Move experience up',
      moveExperienceDown: 'Move experience down',
      removeExperience: 'Remove experience',
      moveEducationUp: 'Move education up',
      moveEducationDown: 'Move education down',
      removeEducation: 'Remove education',
      moveCertificateUp: 'Move certificate up',
      moveCertificateDown: 'Move certificate down',
      removeCertificate: 'Remove certificate',
      moveHighlightUp: 'Move highlight left',
      moveHighlightDown: 'Move highlight right',
      removeHighlight: 'Remove highlight',
    },
    links: {
      credential: 'View credential',
    },
    messages: {
      restoreConfirm: 'Restore all original resume content?',
      importError: 'Could not import this JSON file.',
      restored: 'Original content restored.',
      saved: 'Changes saved.',
      saveFailed: 'Could not save in this browser.',
      switchCustomizedConfirm:
        'Switching languages will load the saved/original version for that language. Current-language edits were already preserved. Continue?',
    },
    placeholders: {
      educationInstitution: 'Institution name',
      educationCourse: 'Course or degree',
      educationStart: 'Start year',
      educationEnd: 'Completion year',
      educationStatus: 'Course status',
      certificateTitle: 'Certificate name',
      certificateIssuer: 'Issuing organization',
      certificateDate: 'Issue year',
      highlightTitle: 'New highlight',
      highlightDescription: 'Describe a strength, achievement, or professional differentiator.',
      skill: 'New skill',
      languageNamePrompt: 'Language name:',
      languageLevelPrompt: 'Language level',
      languageLevelDefault: 'Basic',
      languageInvalidLevel: 'Choose a valid level:',
      experienceDescription: 'Describe your main activity or result.',
      currentExperienceEnd: 'Present',
      invalidExperienceDate: 'The end date must be after the start date.',
    },
    languageLevels: ['Basic', 'Intermediate', 'Advanced', 'Fluent', 'Native'],
  },
};
