import { Component, ChangeDetectionStrategy } from '@angular/core';

type Skill = { name: string; logo: string };

@Component({
  selector: 'app-skills-marquee',
  templateUrl: './skills-marquee.html',
  styleUrl: './skills-marquee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsMarqueeComponent {
  private readonly skills: Skill[] = [
    { name: 'Tailwind CSS',   logo: '/icons/tailwind.svg'    },
    { name: 'Node.js',        logo: '/icons/nodejs.svg'      },
    { name: 'NestJS',         logo: '/icons/nestjs.svg'      },
    { name: 'PostgreSQL',     logo: '/icons/postgresql.svg'  },
    { name: 'Docker',         logo: '/icons/docker.svg'      },
    { name: 'GitHub Actions', logo: '/icons/github.svg'      },
    { name: 'Git',            logo: '/icons/git.svg'         },
    { name: 'VS Code',        logo: '/icons/vscode.svg'      },
    { name: 'Angular',        logo: '/icons/angular.svg'     },
    { name: 'TypeScript',     logo: '/icons/typescript.svg'  },
  ];

  protected readonly skillsDoubled: Skill[] = [...this.skills, ...this.skills];
}
