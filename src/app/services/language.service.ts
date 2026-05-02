import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'pt' | 'en';

const TRANSLATIONS = {
  pt: {
    nav: {
      home: 'home()',
      about: 'about()',
      projects: 'project()',
      stack: 'stack()',
      contact: 'contact()',
      skipToContent: 'Pular para o conteúdo',
      logoAria: 'Início',
      mainNavAria: 'Navegação principal',
      mobileNavAria: 'Navegação mobile',
      openMenuAria: 'Abrir menu de navegação',
      themeToggleTitle: 'Alternar tema',
      themeToLight: 'Ativar tema claro',
      themeToDark: 'Ativar tema escuro',
      langToggleAria: 'Switch to English',
    },
    marquee: {
      ariaLabel: 'Tecnologias que utilizo',
    },
    hero: {
      status: 'Disponível para novos projetos',
      location: 'Santa Catarina',
      since: 'Desde 2021',
      greeting: '//olá, sou o',
      name: 'Murilo',
      bio: 'Full Stack Developer Pleno com mais de 5 anos de experiência em aplicações web corporativas. Especialista em APIs REST com Java e Spring Boot, arquitetura de microsserviços e modernização de sistemas legados — também atuo no front com Angular.',
      cta: 'Veja mais',
    },
    about: {
      heading: 'about',
      badge: 'Full Stack Developer Pleno',
      bio: 'Atuo principalmente como Back-end Java Developer em sistemas de alta criticidade, com foco em performance, segurança e escalabilidade. Aplico SOLID, Clean Code e arquitetura em camadas — e trago experiência com Docker, AWS, PostgreSQL, MySQL e front-end Angular pra fechar o ciclo full stack.',
      formacao: {
        degree: 'Bacharel em Sistemas de Informação',
        institution: 'UNIDAVI · 2022 – 2025',
      },
      stats: {
        ariaLabel: 'Estatísticas',
        yearsValue: '5+',
        yearsLabel: 'Anos de experiência profissional',
        projectsValue: '10+',
        projectsLabel: 'Tecnologias e ferramentas',
        languagesValue: '4',
        languagesLabel: 'Setores de atuação',
      },
      currentBadge: 'atual',
      currentPeriod: 'atual',
      experienceLabel: 'Experiências profissionais',
      downloadCv: 'Baixar Currículo',
    },
    projects: {
      heading: 'projects',
      visit: 'Visitar',
      viewCode: 'Ver código',
      details: 'Detalhes',
      reposTitle: 'Repositórios do projeto',
      reposClose: 'Fechar',
      detailsTitle: 'Detalhes do projeto',
      detailsClose: 'Fechar',
      carouselPrev: 'Imagem anterior',
      carouselNext: 'Próxima imagem',
    },
    contact: {
      heading: 'contact',
      sub: 'Vamos conversar?',
      emailLabel: 'Me envie um e-mail',
      copy: 'Copiar',
      copied: 'Copiado!',
      findMe: 'Onde me encontrar',
      sendEmailTo: 'Enviar email para',
      bio: 'Estou disponível para novos projetos, colaborações ou apenas bater um papo sobre tecnologia. Manda uma mensagem!',
    },
    footer: {
      built: 'Construído com',
      and: 'e',
      rights: 'Murilo Costa Bittencourt',
    },
  },
  en: {
    nav: {
      home: 'home()',
      about: 'about()',
      projects: 'project()',
      stack: 'stack()',
      contact: 'contact()',
      skipToContent: 'Skip to main content',
      logoAria: 'Home',
      mainNavAria: 'Main navigation',
      mobileNavAria: 'Mobile navigation',
      openMenuAria: 'Open navigation menu',
      themeToggleTitle: 'Toggle theme',
      themeToLight: 'Switch to light theme',
      themeToDark: 'Switch to dark theme',
      langToggleAria: 'Mudar para Português',
    },
    marquee: {
      ariaLabel: 'Technologies I use',
    },
    hero: {
      status: 'Available for new projects',
      location: 'Santa Catarina',
      since: 'Since 2021',
      greeting: '//hello, I am',
      name: 'Murilo',
      bio: 'Mid-level Full Stack Developer with 5+ years of experience in enterprise web applications. Specialized in REST APIs with Java and Spring Boot, microservices architecture and legacy system modernization — I also work on the front end with Angular.',
      cta: 'See more',
    },
    about: {
      heading: 'about',
      badge: 'Mid-level Full Stack Developer',
      bio: 'I work primarily as a Back-end Java Developer on mission-critical systems, focused on performance, security and scalability. I apply SOLID, Clean Code and layered architecture — and bring experience with Docker, AWS, PostgreSQL, MySQL and Angular front-end to close the full-stack loop.',
      formacao: {
        degree: 'Bachelor in Information Systems',
        institution: 'UNIDAVI · 2022 – 2025',
      },
      stats: {
        ariaLabel: 'Stats',
        yearsValue: '5+',
        yearsLabel: 'Years of professional experience',
        projectsValue: '10+',
        projectsLabel: 'Technologies & tools',
        languagesValue: '4',
        languagesLabel: 'Industry domains',
      },
      currentBadge: 'current',
      currentPeriod: 'present',
      experienceLabel: 'Professional experience',
      downloadCv: 'Download Resume',
    },
    projects: {
      heading: 'projects',
      visit: 'Visit',
      viewCode: 'View code',
      details: 'Details',
      reposTitle: 'Project repositories',
      reposClose: 'Close',
      detailsTitle: 'Project details',
      detailsClose: 'Close',
      carouselPrev: 'Previous image',
      carouselNext: 'Next image',
    },
    contact: {
      heading: 'contact',
      sub: "Let's talk?",
      emailLabel: 'Send me an e-mail',
      copy: 'Copy',
      copied: 'Copied!',
      findMe: 'Find me at',
      sendEmailTo: 'Send email to',
      bio: "I'm available for new projects, collaborations or just a chat about technology. Send me a message!",
    },
    footer: {
      built: 'Built with',
      and: 'and',
      rights: 'Murilo Costa Bittencourt',
    },
  },
} as const;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>('pt');
  readonly t = computed(() => TRANSLATIONS[this.lang()]);

  toggle(): void {
    this.lang.update(l => (l === 'pt' ? 'en' : 'pt'));
  }
}
