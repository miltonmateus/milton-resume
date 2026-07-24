export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
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
  languages: Language[];
  highlights: Highlight[];
}

export type ResumeIconName =
  | 'award'
  | 'blocks'
  | 'braces'
  | 'building-2'
  | 'check'
  | 'code-xml'
  | 'contact'
  | 'database'
  | 'download'
  | 'globe-2'
  | 'graduation-cap'
  | 'image-up'
  | 'lightbulb'
  | 'link'
  | 'mail'
  | 'map-pin'
  | 'monitor-smartphone'
  | 'panels-top-left'
  | 'pencil'
  | 'phone'
  | 'pickaxe'
  | 'plus'
  | 'rotate-ccw'
  | 'server-cog'
  | 'shield-check'
  | 'user-round-arrow-left'
  | 'users-round'
  | 'wrench';
