import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  current: boolean;
};

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly langService = inject(LanguageService);

  /** Experiências reais — extraídas do CV em ordem cronológica reversa (mais recente primeiro). */
  protected readonly experiences: Experience[] = [
    {
      title: 'Software Developer II',
      company: 'Senior Sistemas',
      period: '2024 – atual',
      description:
        'Atuo no módulo de Agronegócio em sistemas corporativos de alta criticidade. Desenvolvimento de microsserviços em Java/Spring Boot, APIs REST com regras complexas, comunicação assíncrona via RabbitMQ e integração com sistemas legados on-premises. Participo de decisões técnicas e revisão de código aplicando SOLID, Clean Architecture e JUnit.',
      tags: ['Java', 'Spring Boot', 'Microsserviços', 'RabbitMQ', 'JUnit'],
      current: true,
    },
    {
      title: 'Desenvolvedor Back-end I',
      company: 'Nuvy',
      period: '2023 – 2024',
      description:
        'APIs REST em Java/Spring Boot com integrações fiscais (NF-e/NFC-e via TecnoSpeed) e sistemas de frente de caixa. Regras de negócio fiscais e financeiras complexas, persistência com PostgreSQL/JPA/Hibernate e arquitetura baseada em microsserviços conteinerizados com Docker.',
      tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'NF-e'],
      current: false,
    },
    {
      title: 'Desenvolvedor Java – P&D',
      company: 'IPM Sistemas',
      period: '2022 – 2023',
      description:
        'Serviços para emissão de relatórios (BIRT), assinatura eletrônica integrada à BRy Tecnologia, agendamento com Quartz e manipulação de documentos com Aspose. Integração TEF via WebSocket, migração de Servlets para arquitetura conteinerizada com Docker e microsserviço Node.js para geração de PDFs a partir de HTML.',
      tags: ['Java', 'Servlets', 'Docker', 'Node.js', 'WebSocket'],
      current: false,
    },
    {
      title: 'Programador Web',
      company: 'Delsoft Sistemas (Evolutize)',
      period: '2021 – 2022',
      description:
        'Manutenção e desenvolvimento de novas funcionalidades em ERP, atuando com GeneXus no módulo de Manufatura. Correções de bugs, melhorias incrementais e evolução do sistema.',
      tags: ['GeneXus', 'ERP', 'SQL'],
      current: false,
    },
  ];

  /**
   * Índice da experiência em destaque na timeline (step ativo).
   * Inicia na "atual" (current === true); senão, no primeiro item.
   */
  protected readonly selectedIndex = signal<number>(
    Math.max(
      0,
      this.experiences.findIndex(e => e.current),
    ),
  );

  protected select(i: number): void {
    this.selectedIndex.set(i);
  }
}
