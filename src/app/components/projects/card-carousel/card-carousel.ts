import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

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
  readonly images = input.required<readonly string[]>();
  readonly intervalMs = input(3500);
  readonly alt = input('');

  protected readonly current = signal(0);
  protected readonly paused = signal(false);

  constructor() {
    const id = setInterval(() => {
      if (this.paused()) return;
      const len = this.images().length;
      if (len > 1) this.current.update(i => (i + 1) % len);
    }, this.intervalMs());

    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
