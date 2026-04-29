import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faAngular,
  faAws,
  faDocker,
  faGitAlt,
  faJava,
  faLinux,
  faNodeJs,
  faPostgresql,
  faTypescript,
  type IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

/**
 * Skills exibidas no marquee.
 * - `faIcon`  → usa FontAwesome (preferido)
 * - `imgSrc`  → usa SVG local quando o ícone não existe no FA Free
 * - `hideName` → pula a label de texto ao lado (útil quando o próprio ícone
 *                já contém o nome da marca, ex: AWS)
 * (sempre exatamente um entre faIcon/imgSrc é definido)
 */
type Skill = {
  name: string;
  hideName?: boolean;
} & (
  | { faIcon: IconDefinition; imgSrc?: never }
  | { faIcon?: never; imgSrc: string }
);

@Component({
  selector: 'app-skills-marquee',
  templateUrl: './skills-marquee.html',
  styleUrl: './skills-marquee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaIconComponent],
})
export class SkillsMarqueeComponent {
  /** Stack do CV: Java backend + Spring Boot + microsserviços + cloud + Angular front. */
  private readonly skills: Skill[] = [
    { name: 'Java',         faIcon: faJava       },
    { name: 'Spring Boot',  imgSrc: 'icons/spring.svg' },
    { name: 'Angular',      faIcon: faAngular    },
    { name: 'TypeScript',   faIcon: faTypescript },
    { name: 'Node.js',      faIcon: faNodeJs     },
    { name: 'PostgreSQL',   faIcon: faPostgresql },
    { name: 'Docker',       faIcon: faDocker     },
    /* AWS: o ícone já traz "aws" desenhado, então escondemos o label de texto */
    { name: 'AWS',          faIcon: faAws,       hideName: true },
    { name: 'Linux',        faIcon: faLinux      },
    { name: 'Git',          faIcon: faGitAlt     },
  ];

  /**
   * Quantas vezes a lista de skills é repetida em CADA metade da track.
   * Pra parecer infinito, uma metade precisa ser mais larga que o viewport
   * (animação vai de translateX(0) a translateX(-50%); se uma metade < viewport,
   * fica um gap vazio no final antes do salto). 10 itens × ~150px ≈ 1500px;
   * 3× = ~4500px, cobre folgado até telas 4K (3840px).
   *
   * Mantenha em sincronia com `--marquee-repeat` no SCSS — a duração do
   * scroll é multiplicada pelo mesmo fator pra preservar a velocidade visual.
   */
  private static readonly REPEAT_PER_HALF = 3;

  private readonly skillsHalf: Skill[] = Array.from(
    { length: SkillsMarqueeComponent.REPEAT_PER_HALF },
    () => this.skills,
  ).flat();

  /** Track final: duas metades idênticas — a animação `0 → -50%` aterrissa no início da segunda. */
  protected readonly skillsDoubled: Skill[] = [...this.skillsHalf, ...this.skillsHalf];
}
