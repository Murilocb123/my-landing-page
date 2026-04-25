import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'pt' | 'en';

const TRANSLATIONS = {
  pt: {
    nav: {
      home: 'this.home()',
      about: 'this.about()',
      work: 'this.work()',
      stack: 'this.stack()',
      contact: 'this.contact()',
    },
    hero: {
      status: 'Disponível para novos projetos',
      location: 'Santa Catarina',
      since: 'Desde 2021',
      greeting: '//olá, sou o',
      name: 'Murilo',
      bio: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais robustas e escaláveis. Especializado em Angular, Node.js e arquiteturas modernas de software.',
      cta: 'Veja Mais',
    },
    about: {
      heading: 'about',
      badge: 'Full Stack Developer',
      bio: 'Sou um desenvolvedor Full Stack com foco em criar aplicações web de alta performance. Trabalho com tecnologias modernas tanto no front-end quanto no back-end, sempre priorizando código limpo, escalável e acessível.',
      stats: {
        yearsValue: '6',
        yearsLabel: 'Anos de experiência em programação',
        projectsValue: '+10',
        projectsLabel: 'Projetos feitos',
        languagesValue: '+5',
        languagesLabel: 'Linguagens aprendidas',
      },
      experienceLabel: 'Experiências profissionais',
    },
    projects: {
      heading: 'project',
      visit: 'Visitar',
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
      rights: 'Murilo',
    },
  },
  en: {
    nav: {
      home: 'this.home()',
      about: 'this.about()',
      work: 'this.work()',
      stack: 'this.stack()',
      contact: 'this.contact()',
    },
    hero: {
      status: 'Available for new projects',
      location: 'Santa Catarina',
      since: 'Since 2021',
      greeting: '//hello, I am',
      name: 'Murilo',
      bio: 'Full Stack Developer passionate about building robust and scalable digital experiences. Specialized in Angular, Node.js, and modern software architectures.',
      cta: 'See More',
    },
    about: {
      heading: 'about',
      badge: 'Full Stack Developer',
      bio: 'I am a Full Stack Developer focused on building high-performance web applications. I work with modern technologies on both front-end and back-end, always prioritizing clean, scalable, and accessible code.',
      stats: {
        yearsValue: '6',
        yearsLabel: 'Years of programming experience',
        projectsValue: '+10',
        projectsLabel: 'Projects built',
        languagesValue: '+5',
        languagesLabel: 'Languages learned',
      },
      experienceLabel: 'Professional experience',
    },
    projects: {
      heading: 'project',
      visit: 'Visit',
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
      rights: 'Murilo',
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
