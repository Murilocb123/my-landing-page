import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeroComponent {
  protected readonly langService = inject(LanguageService);

  protected scrollToAbout(): void {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
