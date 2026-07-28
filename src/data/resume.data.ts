import type { Resume, ResumeLocale } from '../types/resume';

export const defaultResumeLocale: ResumeLocale = 'pt-BR';

const ptBrResume: Resume = {
  personal: {
    fullName: 'Milton Mateus Alves Teixeira Filho',
    professionalTitle: 'Software Engineer <span>.</span> Full Stack Developer',
    email: 'miltonmatews@gmail.com',
    location: 'Porto Alegre - RS',
    linkedin: 'https://www.linkedin.com/in/milton-teixeira-89147598',
    github: 'https://github.com/miltonmateus',
    profileImage: '/Milton.jpg',
  },
  summary: {
    title: 'Sobre mim',
    paragraphs: [
      'Desenvolvedor Full Stack com mais de oito anos de experiência no desenvolvimento de aplicações web, APIs e sistemas corporativos.',
      'Atuação em projetos dos setores financeiro, judiciário e de recursos humanos, trabalhando tanto no backend quanto no frontend.',
      'Experiência com Java, TypeScript, Node.js, NestJS, C#, Angular, React, SvelteKit e MongoDB.',
    ],
  },
  skills: [
    { title: 'Linguagens', skills: ['Java', 'TypeScript', 'JavaScript', 'C#', 'Python', 'PHP', 'SQL'] },
    { title: 'Backend', skills: ['Node.js', 'NestJS', 'ASP.NET Core', 'REST APIs', 'Swagger / OpenAPI'] },
    { title: 'Frontend', skills: ['Angular', 'React', 'Next.js', 'SvelteKit', 'HTML5', 'CSS3'] },
    { title: 'Banco de dados', skills: ['MongoDB', 'Oracle'] },
    { title: 'Ferramentas', skills: ['Git', 'Azure DevOps', 'Docker', 'Linux', 'Postman'] },
  ],
  experience: [
    {
      company: 'Villela Brasil Bank',
      role: 'Desenvolvedor Full Stack',
      startDate: '2026',
      endDate: 'Atual',
      location: 'Porto Alegre - RS',
      description: [
        'Desenvolvimento e manutenção de APIs REST para sistemas do setor financeiro.',
        'Desenvolvimento de aplicações web completas, atuando no backend e no frontend.',
        'Implementação de novas funcionalidades, integrações e correção de incidentes em produção.',
      ],
    },
    {
      company: 'Mondo Cane Bar',
      role: 'Proprietário e Administrador',
      startDate: '2019',
      endDate: '2024',
      location: 'Cidade Baixa, Porto Alegre - RS',
      description: [
        'Gestão de espaço cultural voltado à literatura, cinema, música e artes, promovendo convivência e expressão cultural.',
        'Administração financeira, operacional e estratégica do estabelecimento.',
        'Planejamento e produção de eventos culturais de literatura, cinema e música.',
        'Gestão de fornecedores, compras, estoque e controle de custos.',
        'Coordenação das operações diárias, atendimento ao público e relacionamento com clientes.',
        'Desenvolvimento de ações para fortalecimento da comunidade e fidelização de clientes.',
      ],
    },
    {
      company: 'South System',
      role: 'Desenvolvedor Full Stack',
      startDate: '2016',
      endDate: '2019',
      location: 'Porto Alegre - RS',
      description: [
        'Desenvolvimento frontend utilizando Angular.',
        'Desenvolvimento backend com Node.js.',
        'Mineração e processamento de dados com Python e Beautiful Soup.',
        'Refatoração de aplicações internas e participação em projetos de reconhecimento de imagens.',
      ],
    },
    {
      company: 'Tribunal de Justiça do Rio Grande do Sul',
      role: 'Técnico de Banco de Dados',
      startDate: '2013',
      endDate: '2015',
      location: 'Porto Alegre - RS',
      description: [
        'Validação de dados provenientes de sistemas externos.',
        'Administração de acessos por meio do Microsoft Active Directory.',
        'Suporte às bases Oracle utilizadas pelo órgão.',
      ],
    },
  ],
  education: [
    {
      institution: 'Centro Universitário Ritter dos Reis',
      course: 'Tecnólogo em Desenvolvimento de Jogos Digitais',
      startDate: '2026',
      status: 'Em andamento - 2o semestre',
    },
    {
      institution: 'Pontifícia Universidade Católica do Rio Grande do Sul',
      course: 'Bacharelado em Ciência da Computação',
      startDate: '2013',
      endDate: '2014',
      status: 'Não concluído',
    },
  ],
  certificates: [
    {
      title: 'EF SET English Certificate',
      issuer: 'EF SET',
      credentialUrl: 'https://cert.efset.org/saRMra',
    },
  ],
  projects: [
    {
      title: 'recupere.ia',
      role: 'Projeto Full Stack',
      period: '2026',
      description:
        'Aplicação orientada por IA para apoiar fluxos de recuperação, organização e análise de informações, com foco em experiência clara e operação eficiente.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'IA'],
      projectUrl: 'https://play.google.com/store/apps/details?id=com.vbb.appdiagnostic&pcampaignid=web_share',
    },
  ],
  languages: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Fluente' },
  ],
  highlights: [
    {
      icon: 'code-xml',
      title: 'Atuação Full Stack',
      description: 'Experiência sólida em backend e frontend, entregando soluções completas e integradas.',
    },
    {
      icon: 'shield-check',
      title: 'Qualidade & Boas Práticas',
      description: 'Foco em código limpo, testes, segurança, performance e manutenibilidade.',
    },
    {
      icon: 'lightbulb',
      title: 'Resolução de Problemas',
      description: 'Análise crítica, investigação de incidentes e busca por soluções eficientes.',
    },
    {
      icon: 'users-round',
      title: 'Trabalho em Equipe',
      description: 'Colaboração em times ágeis e multidisciplinares, com comunicação clara e objetiva.',
    },
  ],
};

const enUsResume: Resume = {
  personal: {
    ...ptBrResume.personal,
    location: 'Porto Alegre, RS, Brazil',
  },
  summary: {
    title: 'About me',
    paragraphs: [
      'Full Stack Developer with over eight years of experience building web applications, APIs, and enterprise systems.',
      'Background in financial, legal, and human resources projects, working across backend and frontend responsibilities.',
      'Hands-on experience with Java, TypeScript, Node.js, NestJS, C#, Angular, React, SvelteKit, and MongoDB.',
    ],
  },
  skills: [
    { title: 'Languages', skills: ['Java', 'TypeScript', 'JavaScript', 'C#', 'Python', 'PHP', 'SQL'] },
    { title: 'Backend', skills: ['Node.js', 'NestJS', 'ASP.NET Core', 'REST APIs', 'Swagger / OpenAPI'] },
    { title: 'Frontend', skills: ['Angular', 'React', 'Next.js', 'SvelteKit', 'HTML5', 'CSS3'] },
    { title: 'Databases', skills: ['MongoDB', 'Oracle'] },
    { title: 'Tools', skills: ['Git', 'Azure DevOps', 'Docker', 'Linux', 'Postman'] },
  ],
  experience: [
    {
      company: 'Villela Brasil Bank',
      role: 'Full Stack Developer',
      startDate: '2026',
      endDate: 'Present',
      location: 'Porto Alegre, RS, Brazil',
      description: [
        'Developed and maintained REST APIs for financial-sector systems.',
        'Built complete web applications, contributing across backend and frontend layers.',
        'Implemented new features, integrations, and production incident fixes.',
      ],
    },
    {
      company: 'Mondo Cane Bar',
      role: 'Owner and Administrator',
      startDate: '2019',
      endDate: '2024',
      location: 'Cidade Baixa, Porto Alegre, RS, Brazil',
      description: [
        'Managed a cultural venue focused on literature, cinema, music, and arts, fostering community and cultural expression.',
        'Led financial, operational, and strategic administration of the business.',
        'Planned and produced cultural events involving literature, cinema, and music.',
        'Managed suppliers, purchasing, inventory, and cost control.',
        'Coordinated daily operations, customer service, and customer relationships.',
        'Developed initiatives to strengthen community engagement and customer loyalty.',
      ],
    },
    {
      company: 'South System',
      role: 'Full Stack Developer',
      startDate: '2016',
      endDate: '2019',
      location: 'Porto Alegre, RS, Brazil',
      description: [
        'Developed frontend features using Angular.',
        'Built backend services with Node.js.',
        'Performed data mining and processing with Python and Beautiful Soup.',
        'Refactored internal applications and contributed to image recognition projects.',
      ],
    },
    {
      company: 'Court of Justice of Rio Grande do Sul',
      role: 'Database Technician',
      startDate: '2013',
      endDate: '2015',
      location: 'Porto Alegre, RS, Brazil',
      description: [
        'Validated data coming from external systems.',
        'Managed user access through Microsoft Active Directory.',
        'Provided support for Oracle databases used by the institution.',
      ],
    },
  ],
  education: [
    {
      institution: 'Centro Universitário Ritter dos Reis',
      course: 'Associate Degree in Digital Game Development',
      startDate: '2026',
      status: 'In progress - 2nd semester',
    },
    {
      institution: 'Pontifical Catholic University of Rio Grande do Sul',
      course: "Bachelor's Degree in Computer Science",
      startDate: '2013',
      endDate: '2014',
      status: 'Not completed',
    },
  ],
  certificates: [
    {
      title: 'EF SET English Certificate',
      issuer: 'EF SET',
      credentialUrl: 'https://cert.efset.org/saRMra',
    },
  ],
  projects: [
    {
      title: 'recupere.ia',
      role: 'Full Stack Project',
      period: '2026',
      description:
        'AI-driven application designed to support information recovery, organization, and analysis workflows, with a clear user experience and efficient operation.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'AI'],
      projectUrl: 'https://play.google.com/store/apps/details?id=com.vbb.appdiagnostic&pcampaignid=web_share',
    },
  ],
  languages: [
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
  highlights: [
    {
      icon: 'code-xml',
      title: 'Full Stack Delivery',
      description: 'Solid experience across backend and frontend, delivering complete integrated solutions.',
    },
    {
      icon: 'shield-check',
      title: 'Quality & Best Practices',
      description: 'Focused on clean code, testing, security, performance, and maintainability.',
    },
    {
      icon: 'lightbulb',
      title: 'Problem Solving',
      description:
        'Critical analysis, incident investigation, and a practical search for efficient solutions.',
    },
    {
      icon: 'users-round',
      title: 'Team Collaboration',
      description:
        'Collaboration in agile and multidisciplinary teams, with clear and objective communication.',
    },
  ],
};

export const resumesByLocale: Record<ResumeLocale, Resume> = {
  'pt-BR': ptBrResume,
  'en-US': enUsResume,
};

export const resume = resumesByLocale[defaultResumeLocale];

export const blankResumesByLocale: Record<ResumeLocale, Resume> = {
  'pt-BR': {
    personal: {
      fullName: 'Seu nome completo',
      professionalTitle: 'Seu cargo ou área profissional',
      email: 'seuemail@exemplo.com',
      location: 'Sua cidade - Estado',
      linkedin: 'https://www.linkedin.com/in/seu-perfil',
      github: 'https://github.com/seu-usuario',
      profileImage: '/profile-placeholder.svg',
    },
    summary: {
      title: 'Sobre mim',
      paragraphs: [
        'Escreva um breve resumo sobre sua experiência, seus principais conhecimentos e seus objetivos profissionais.',
      ],
    },
    skills: [
      { title: 'Competências', skills: [] },
      { title: 'Ferramentas', skills: [] },
    ],
    experience: [
      {
        company: 'Nome da empresa',
        role: 'Cargo ou função',
        startDate: 'Início',
        endDate: 'Fim',
        location: 'Cidade - Estado',
        description: ['Descreva sua principal atividade, responsabilidade ou resultado.'],
      },
    ],
    education: [
      {
        institution: 'Nome da instituição',
        course: 'Curso ou formação',
        startDate: 'Ano de início',
        endDate: 'Ano de conclusão',
        status: 'Situação do curso',
      },
    ],
    certificates: [],
    projects: [
      {
        title: 'Nome do projeto',
        role: 'Seu papel no projeto',
        period: 'Ano ou período',
        description: 'Descreva o objetivo do projeto, sua contribuição e o resultado alcançado.',
        technologies: ['Tecnologia'],
      },
    ],
    languages: [],
    highlights: [
      {
        icon: 'lightbulb',
        title: 'Seu diferencial',
        description: 'Descreva uma qualidade, conquista ou diferencial profissional.',
      },
    ],
  },
  'en-US': {
    personal: {
      fullName: 'Your full name',
      professionalTitle: 'Your role or professional field',
      email: 'you@example.com',
      location: 'Your city, state',
      linkedin: 'https://www.linkedin.com/in/your-profile',
      github: 'https://github.com/your-user',
      profileImage: '/profile-placeholder.svg',
    },
    summary: {
      title: 'About me',
      paragraphs: ['Write a short summary of your experience, core skills, and professional goals.'],
    },
    skills: [
      { title: 'Skills', skills: [] },
      { title: 'Tools', skills: [] },
    ],
    experience: [
      {
        company: 'Company name',
        role: 'Role or position',
        startDate: 'Start',
        endDate: 'End',
        location: 'City, state',
        description: ['Describe your main responsibility, activity, or result.'],
      },
    ],
    education: [
      {
        institution: 'Institution name',
        course: 'Course or degree',
        startDate: 'Start year',
        endDate: 'Completion year',
        status: 'Course status',
      },
    ],
    certificates: [],
    projects: [
      {
        title: 'Project name',
        role: 'Your role in the project',
        period: 'Year or period',
        description: 'Describe the project goal, your contribution, and the outcome achieved.',
        technologies: ['Technology'],
      },
    ],
    languages: [],
    highlights: [
      {
        icon: 'lightbulb',
        title: 'Your differentiator',
        description: 'Describe a strength, achievement, or professional differentiator.',
      },
    ],
  },
};

export const blankResume = blankResumesByLocale[defaultResumeLocale];
