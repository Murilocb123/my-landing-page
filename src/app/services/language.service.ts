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
      stats: {
        yearsValue: '5+',
        yearsLabel: 'Anos como dev profissional',
        projectsValue: '4',
        projectsLabel: 'Empresas onde atuei',
        languagesValue: '6',
        languagesLabel: 'Linguagens dominadas',
      },
      experienceLabel: 'Experiências profissionais',
      downloadCv: 'Baixar Currículo',
    },
    projects: {
      heading: 'project',
      visit: 'Visitar',
      viewCode: 'Ver código',
      reposTitle: 'Repositórios do projeto',
      reposClose: 'Fechar',
    },
    contact: {
      heading: 'contact',
      sub: 'Vamos conversar?',
      emailLabel: 'Me envie um e-mail',
      copy: 'Copiar',
      copied: 'Copiado!',
      findMe: 'Onde me encontrar',
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
      stats: {
        yearsValue: '5+',
        yearsLabel: 'Years as a professional dev',
        projectsValue: '4',
        projectsLabel: 'Companies I worked at',
        languagesValue: '6',
        languagesLabel: 'Languages mastered',
      },
      experienceLabel: 'Professional experience',
      downloadCv: 'Download Resume',
    },
    projects: {
      heading: 'project',
      visit: 'Visit',
      viewCode: 'View code',
      reposTitle: 'Project repositories',
      reposClose: 'Close',
    },
    contact: {
      heading: 'contact',
      sub: "Let's talk?",
      emailLabel: 'Send me an e-mail',
      copy: 'Copy',
      copied: 'Copied!',
      findMe: 'Find me at',
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
