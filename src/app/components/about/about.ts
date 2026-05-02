import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';

type ExperienceSource = {
  title: string;
  company: string;
  start: string;
  /** Ano final como string ('2024'); deixe `undefined` quando for a posição atual. */
  end?: string;
  descriptionPt: string;
  descriptionEn: string;
  tags: readonly string[];
  current: boolean;
};

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: readonly string[];
  current: boolean;
};

const EXPERIENCES_SOURCE: readonly ExperienceSource[] = [
  {
    title: 'Software Developer II',
    company: 'Senior Sistemas',
    start: '2024',
    end: undefined,
    descriptionPt:
      'Atuo no módulo de Agronegócio em sistemas corporativos de alta criticidade. Desenvolvimento de microsserviços em Java/Spring Boot, APIs REST com regras complexas, comunicação assíncrona via RabbitMQ e integração com sistemas legados on-premises. Participo de decisões técnicas e revisão de código aplicando SOLID, Clean Architecture e JUnit.',
    descriptionEn:
      'I work on the Agribusiness module in mission-critical enterprise systems. Java/Spring Boot microservices development, REST APIs with complex business rules, asynchronous communication via RabbitMQ and integration with on-premises legacy systems. I take part in technical decisions and code review applying SOLID, Clean Architecture and JUnit.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'RabbitMQ', 'JUnit'],
    current: true,
  },
  {
    title: 'Desenvolvedor Back-end I',
    company: 'Nuvy',
    start: '2023',
    end: '2024',
    descriptionPt:
      'APIs REST em Java/Spring Boot com integrações fiscais (NF-e/NFC-e via TecnoSpeed) e sistemas de frente de caixa. Regras de negócio fiscais e financeiras complexas, persistência com PostgreSQL/JPA/Hibernate e arquitetura baseada em microsserviços conteinerizados com Docker.',
    descriptionEn:
      'REST APIs in Java/Spring Boot with tax integrations (Brazilian NF-e/NFC-e via TecnoSpeed) and point-of-sale systems. Complex tax and financial business rules, persistence with PostgreSQL/JPA/Hibernate and a microservices architecture containerized with Docker.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'NF-e'],
    current: false,
  },
  {
    title: 'Desenvolvedor Java – P&D',
    company: 'IPM Sistemas',
    start: '2022',
    end: '2023',
    descriptionPt:
      'Serviços para emissão de relatórios (BIRT), assinatura eletrônica integrada à BRy Tecnologia, agendamento com Quartz e manipulação de documentos com Aspose. Integração TEF via WebSocket, migração de Servlets para arquitetura conteinerizada com Docker e microsserviço Node.js para geração de PDFs a partir de HTML.',
    descriptionEn:
      'Services for report generation (BIRT), electronic signature integrated with BRy Tecnologia, job scheduling with Quartz and document manipulation with Aspose. TEF integration via WebSocket, migration from Servlets to a containerized architecture with Docker, and a Node.js microservice for HTML-to-PDF generation.',
    tags: ['Java', 'Servlets', 'Docker', 'Node.js', 'WebSocket'],
    current: false,
  },
  {
    title: 'Programador Web',
    company: 'Delsoft Sistemas (Evolutize)',
    start: '2021',
    end: '2022',
    descriptionPt:
      'Manutenção e desenvolvimento de novas funcionalidades em ERP, atuando com GeneXus no módulo de Manufatura. Correções de bugs, melhorias incrementais e evolução do sistema.',
    descriptionEn:
      'Maintenance and development of new ERP features, working with GeneXus on the Manufacturing module. Bug fixes, incremental improvements and ongoing system evolution.',
    tags: ['GeneXus', 'ERP', 'SQL'],
    current: false,
  },
];

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly langService = inject(LanguageService);

  protected readonly experiences = computed<readonly Experience[]>(() => {
    const isPt = this.langService.lang() === 'pt';
    const t = this.langService.t();
    return EXPERIENCES_SOURCE.map(exp => ({
      title: exp.title,
      company: exp.company,
      period: `${exp.start} – ${exp.end ?? t.about.currentPeriod}`,
      description: isPt ? exp.descriptionPt : exp.descriptionEn,
      tags: exp.tags,
      current: exp.current,
    }));
  });

  protected readonly selectedIndex = signal<number>(
    Math.max(
      0,
      EXPERIENCES_SOURCE.findIndex(e => e.current),
    ),
  );

  protected select(i: number): void {
    this.selectedIndex.set(i);
  }
}
