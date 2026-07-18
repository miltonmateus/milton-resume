export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
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

export interface Language {
  name: string;
  level: string;
}

export interface Resume {
  personal: PersonalInfo;
  summary: Summary;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
}