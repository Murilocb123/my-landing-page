import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeroComponent implements OnDestroy {
  protected readonly langService = inject(LanguageService);

  /** Frases que vão ser digitadas/apagadas em loop sob o nome. */
  private readonly phrases: readonly string[] = [
    'mvn spring-boot:run',
    'docker compose up -d',
    'git commit -m "ship it"',
    'kubectl apply -f .',
    'criando APIs robustas',
  ];

  protected readonly typed = signal<string>('');

  private phraseIdx = 0;
  private charIdx = 0;
  private deleting = false;
  private timerId: ReturnType<typeof setTimeout> | null = null;

  /** Delays (ms) — ajustáveis sem mexer na lógica. */
  private readonly typeDelay = 75;
  private readonly deleteDelay = 35;
  private readonly pauseAfterTyped = 1500;
  private readonly pauseAfterDeleted = 350;

  constructor() {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.timerId !== null) clearTimeout(this.timerId);
  }

  private tick(): void {
    const current = this.phrases[this.phraseIdx];

    if (!this.deleting) {
      this.charIdx++;
      this.typed.set(current.slice(0, this.charIdx));

      if (this.charIdx === current.length) {
        this.deleting = true;
        this.timerId = setTimeout(() => this.tick(), this.pauseAfterTyped);
        return;
      }
      this.timerId = setTimeout(() => this.tick(), this.typeDelay);
      return;
    }

    this.charIdx--;
    this.typed.set(current.slice(0, this.charIdx));

    if (this.charIdx === 0) {
      this.deleting = false;
      this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      this.timerId = setTimeout(() => this.tick(), this.pauseAfterDeleted);
      return;
    }
    this.timerId = setTimeout(() => this.tick(), this.deleteDelay);
  }

  protected scrollToAbout(): void {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
