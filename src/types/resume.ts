export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  profileImage: string;
}

export interface Summary {
  title: string;
  paragraphs: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  icon?: ResumeIconName;
  technologies?: string[];
}

export interface Education {
  institution: string;
  course: string;
  startDate: string;
  endDate?: string;
  status: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface RecentProject {
  title: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Highlight {
  title: string;
  description: string;
  icon: ResumeIconName;
}

export interface Resume {
  personal: PersonalInfo;
  summary: Summary;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  projects: RecentProject[];
  languages: Language[];
  highlights: Highlight[];
}

export type ResumeLocale = 'pt-BR' | 'en-US';

export type ResumeIconName =
  | 'building-2'
  | 'code-xml'
  | 'database'
  | 'lightbulb'
  | 'monitor-smartphone'
  | 'server-cog'
  | 'shield-check'
  | 'users-round'
  | 'wrench';
