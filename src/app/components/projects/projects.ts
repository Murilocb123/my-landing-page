import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../services/language.service';

type Project = {
  title: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tags: string[];
  url: string;
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class ProjectsComponent {
  protected readonly langService = inject(LanguageService);

  protected readonly projects: Project[] = [
    {
      title: 'Portflow',
      description:
        'Plataforma de portfolio para desenvolvedores. Crie seu portfolio profissional com templates modernos e publique em segundos.',
      image: '/images/project-1.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Angular', 'NestJS', 'PostgreSQL'],
      url: '#',
    },
    {
      title: 'API Hub',
      description:
        'Gerenciador de APIs REST com documentação automática, monitoramento de requisições e autenticação OAuth2.',
      image: '/images/project-2.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Node.js', 'Docker', 'TypeScript'],
      url: '#',
    },
    {
      title: 'TaskFlow',
      description:
        'Aplicativo de gerenciamento de tarefas com boards estilo Kanban, notificações em tempo real e integração com GitHub.',
      image: '/images/project-3.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Angular', 'NestJS', 'WebSocket'],
      url: '#',
    },
    {
      title: 'DataViz',
      description:
        'Dashboard de visualização de dados com gráficos interativos, filtros avançados e exportação em múltiplos formatos.',
      image: '/images/project-4.svg',
      imageWidth: 600,
      imageHeight: 340,
      tags: ['Angular', 'D3.js', 'PostgreSQL'],
      url: '#',
    },
  ];
}
