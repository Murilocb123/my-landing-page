import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-card-carousel',
  template: `
    <div
      class="card-carousel"
      (pointerenter)="paused.set(true)"
      (pointerleave)="paused.set(false)"
    >
      @for (img of images(); track img; let i = $index) {
        <img
          [src]="img"
          [alt]="alt() + ' (' + (i + 1) + '/' + images().length + ')'"
          loading="lazy"
          class="card-carousel__img"
          [class.card-carousel__img--active]="i === current()"
        />
      }

      @if (hasMultiple()) {
        <button
          type="button"
          class="card-carousel__nav card-carousel__nav--prev"
          (click)="onPrev($event)"
          [attr.aria-label]="langService.t().projects.carouselPrev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="16" height="16">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          type="button"
          class="card-carousel__nav card-carousel__nav--next"
          (click)="onNext($event)"
          [attr.aria-label]="langService.t().projects.carouselNext"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="16" height="16">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      }

      <div class="card-carousel__dots" aria-hidden="true">
        @for (img of images(); track img; let i = $index) {
          <span
            class="card-carousel__dot"
            [class.card-carousel__dot--active]="i === current()"
          ></span>
        }
      </div>
    </div>
  `,
  styleUrl: './card-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCarouselComponent {
  protected readonly langService = inject(LanguageService);

  readonly images = input.required<readonly string[]>();
  readonly intervalMs = input(3500);
  readonly alt = input('');

  protected readonly current = signal(0);
  protected readonly paused = signal(false);
  protected readonly hasMultiple = computed(() => this.images().length > 1);

  constructor() {
    const id = setInterval(() => {
      if (this.paused()) return;
      const len = this.images().length;
      if (len > 1) this.current.update(i => (i + 1) % len);
    }, this.intervalMs());

    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected onPrev(event: MouseEvent): void {
    event.stopPropagation();
    const len = this.images().length;
    if (len > 1) this.current.update(i => (i - 1 + len) % len);
  }

  protected onNext(event: MouseEvent): void {
    event.stopPropagation();
    const len = this.images().length;
    if (len > 1) this.current.update(i => (i + 1) % len);
  }
}
