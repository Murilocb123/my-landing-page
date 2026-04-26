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

  protected readonly experiences: Experience[] = [
    {
      title: 'Full Stack Developer',
      company: 'Empresa Atual',
      period: '2022 – atual',
      description:
        'Desenvolvimento de aplicações web full stack com Angular e NestJS. Arquitetura de microsserviços, CI/CD com GitHub Actions e deploy em Docker.',
      tags: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
      current: true,
    },
    {
      title: 'Full Stack Developer',
      company: 'Empresa Anterior',
      period: '2021 – 2022',
      description:
        'Desenvolvimento de sistemas internos com foco em performance e experiência do usuário. Integração com APIs REST e banco de dados relacional.',
      tags: ['Angular', 'Node.js', 'MySQL'],
      current: false,
    },
    {
      title: 'Desenvolvedor Front-end',
      company: 'Freelancer',
      period: '2020 – 2021',
      description:
        'Criação de landing pages e e-commerces para pequenos negócios, com foco em responsividade e SEO.',
      tags: ['HTML', 'CSS', 'JavaScript'],
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
