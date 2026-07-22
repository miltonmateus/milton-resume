import type { Resume } from '../types/resume';

export const resume: Resume = {
  personal: {
    fullName: 'Milton Mateus Alves Teixeira Filho',
    professionalTitle: 'Software Engineer <span>.</span> Full Stack Developer',
    email: 'miltonmatews@gmail.com',
    phone: '+55 51 98138-4112',
    location: 'Porto Alegre - RS',
    linkedin: 'https://www.linkedin.com/in/milton-teixeira-89147598',
    profileImage: '/Milton.jpg'
  },

  summary: {
    title: 'Sobre mim',
    paragraphs: [
      'Desenvolvedor Full Stack com mais de oito anos de experiência no desenvolvimento de aplicações web, APIs e sistemas corporativos.',
      'Atuação em projetos dos setores financeiro, judiciário e de recursos humanos, trabalhando tanto no backend quanto no frontend.',
      'Experiência com Java, TypeScript, Node.js, NestJS, C#, Angular, React, SvelteKit e MongoDB.'
    ]
  },

  skills: [
    {
      title: 'Linguagens',
      skills: ['Java', 'TypeScript', 'JavaScript', 'C#', 'Python', 'PHP', 'SQL']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'NestJS', 'ASP.NET Core', 'REST APIs', 'Swagger / OpenAPI']
    },
    {
      title: 'Frontend',
      skills: ['Angular', 'React', 'Next.js', 'SvelteKit', 'HTML5', 'CSS3']
    },
    {
      title: 'Banco de dados',
      skills: ['MongoDB', 'Oracle']
    },
    {
      title: 'Ferramentas',
      skills: ['Git', 'Azure DevOps', 'Docker', 'Linux', 'Postman']
    }
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
        'Implementação de novas funcionalidades, integrações e correção de incidentes em produção.'
      ]
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
        'Refatoração de aplicações internas e participação em projetos de reconhecimento de imagens.'
      ]
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
        'Suporte às bases Oracle utilizadas pelo órgão.'
      ]
    }
  ],

  education: [
    {
      institution: 'Centro Universitário Ritter dos Reis',
      course: 'Tecnólogo em Desenvolvimento de Jogos Digitais',
      startDate: '2026',
      status: 'Em andamento — 2º semestre'
    },
    {
      institution: 'Pontifícia Universidade Católica do Rio Grande do Sul',
      course: 'Bacharelado em Ciência da Computação',
      startDate: '2013',
      endDate: '2014',
      status: 'Não concluído'
    }
  ],

  languages: [
    {
      name: 'Português',
      level: 'Nativo'
    },
    {
      name: 'Inglês',
      level: 'Fluente'
    }
  ],

  highlights: [
    {
      icon: 'code-xml',
      title: 'Atuação Full Stack',
      description: 'Experiência sólida em backend e frontend, entregando soluções completas e integradas.'
    },
    {
      icon: 'shield-check',
      title: 'Qualidade & Boas Práticas',
      description: 'Foco em código limpo, testes, segurança, performance e manutenibilidade.'
    },
    {
      icon: 'lightbulb',
      title: 'Resolução de Problemas',
      description: 'Análise crítica, investigação de incidentes e busca por soluções eficientes.'
    },
    {
      icon: 'users-round',
      title: 'Trabalho em Equipe',
      description: 'Colaboração em times ágeis e multidisciplinares, com comunicação clara e objetiva.'
    }
  ]
};

export const blankResume: Resume = {
  personal: {
    fullName: 'Seu nome completo',
    professionalTitle: 'Seu cargo ou área profissional',
    email: 'seuemail@exemplo.com',
    phone: '(00) 00000-0000',
    location: 'Sua cidade - Estado',
    linkedin: 'https://www.linkedin.com/in/seu-perfil',
    profileImage: '/profile-placeholder.svg'
  },
  summary: {
    title: 'Sobre mim',
    paragraphs: [
      'Escreva um breve resumo sobre sua experiência, seus principais conhecimentos e seus objetivos profissionais.'
    ]
  },
  skills: [
    { title: 'Competências', skills: ['Competência 1', 'Competência 2', 'Competência 3'] },
    { title: 'Ferramentas', skills: ['Ferramenta 1', 'Ferramenta 2'] }
  ],
  experience: [
    {
      company: 'Nome da empresa',
      role: 'Cargo ou função',
      startDate: 'Início',
      endDate: 'Fim',
      location: 'Cidade - Estado',
      description: ['Descreva sua principal atividade, responsabilidade ou resultado.']
    }
  ],
  education: [
    {
      institution: 'Nome da instituição',
      course: 'Curso ou formação',
      startDate: 'Ano de início',
      endDate: 'Ano de conclusão',
      status: 'Situação do curso'
    }
  ],
  languages: [{ name: 'Idioma', level: 'Nível' }],
  highlights: [
    {
      icon: 'lightbulb',
      title: 'Seu diferencial',
      description: 'Descreva uma qualidade, conquista ou diferencial profissional.'
    }
  ]
};
