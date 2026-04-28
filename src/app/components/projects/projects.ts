import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { LanguageService } from '../../services/language.service';

type Repo = { name: string; url: string };

type Project = {
  title: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tags: readonly string[];
  /** URL pública (deploy/produção). Se ausente, botão "Visitar" não aparece. */
  url?: string;
  /**
   * Repositórios do projeto.
   * - 1 repo  → botão "Ver código" abre direto o GitHub
   * - 2+ repos → botão abre modal com a lista (ex: frontend + backend)
   * - undefined → botão "Ver código" não aparece
   */
  repos?: readonly Repo[];
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, FaIconComponent],
})
export class ProjectsComponent {
  protected readonly langService = inject(LanguageService);
  protected readonly faGithub = faGithub;

  protected readonly projects: readonly Project[] = [
    {
      title: 'Portflow',
      description:
        'Plataforma de portfolio para desenvolvedores. Crie seu portfolio profissional com templates modernos e publique em segundos.',
      image: '/images/project-1.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Angular', 'NestJS', 'PostgreSQL'],
      url: 'https://example.com/portflow',
      repos: [
        { name: 'Frontend (Angular)', url: 'https://github.com/Murilocb123/portflow-web' },
        { name: 'Backend (NestJS)', url: 'https://github.com/Murilocb123/portflow-api' },
      ],
    },
    {
      title: 'API Hub',
      description:
        'Gerenciador de APIs REST com documentação automática, monitoramento de requisições e autenticação OAuth2.',
      image: '/images/project-2.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Java', 'Spring Boot', 'Docker'],
      repos: [{ name: 'Repositório', url: 'https://github.com/Murilocb123/api-hub' }],
    },
    {
      title: 'TaskFlow',
      description:
        'Aplicativo de gerenciamento de tarefas com boards estilo Kanban, notificações em tempo real e integração com GitHub.',
      image: '/images/project-3.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Angular', 'NestJS', 'WebSocket'],
      url: 'https://example.com/taskflow',
      repos: [{ name: 'Repositório', url: 'https://github.com/Murilocb123/taskflow' }],
    },
    {
      title: 'DataViz',
      description:
        'Dashboard de visualização de dados com gráficos interativos, filtros avançados e exportação em múltiplos formatos.',
      image: '/images/project-4.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Angular', 'D3.js', 'PostgreSQL'],
      repos: [
        { name: 'Web (Angular + D3)', url: 'https://github.com/Murilocb123/dataviz-web' },
        { name: 'API (Spring Boot)', url: 'https://github.com/Murilocb123/dataviz-api' },
        { name: 'Worker (Node.js)', url: 'https://github.com/Murilocb123/dataviz-worker' },
      ],
    },
  ];

  /** Projeto cujos repositórios estão sendo exibidos no modal (null = fechado). */
  protected readonly openReposFor = signal<Project | null>(null);

  /** Referência ao <dialog> nativo pra abrir/fechar via API HTML. */
  private readonly reposDialog =
    viewChild<ElementRef<HTMLDialogElement>>('reposDialog');

  protected openReposModal(project: Project): void {
    this.openReposFor.set(project);
    /* esperar 1 microtask pra @if popular o conteúdo antes de abrir o dialog */
    queueMicrotask(() => this.reposDialog()?.nativeElement.showModal());
  }

  protected closeReposModal(): void {
    this.reposDialog()?.nativeElement.close();
  }

  /** O <dialog> nativo dispara `close` ao apertar ESC ou via .close() — limpa o estado. */
  protected onDialogClose(): void {
    this.openReposFor.set(null);
  }

  /** Clique no backdrop (fora do conteúdo) fecha o modal. */
  protected onDialogBackdropClick(event: MouseEvent): void {
    if (event.target === this.reposDialog()?.nativeElement) {
      this.closeReposModal();
    }
  }
}
