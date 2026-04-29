import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="section-container footer__inner">
        <p class="footer__left">
          {{ langService.t().footer.built }}
          <span class="footer__tech">Angular</span>
          <span class="footer__sep">{{ langService.t().footer.and }}</span>
          <span class="footer__tech">Tailwind CSS</span>
        </p>
        <p class="footer__right">{{ langService.t().footer.rights }} | 2026</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-bg-section);
      border-top: 1px solid var(--color-border);
      padding-block: 1.5rem;

      &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--color-text-secondary);
      }

      &__tech {
        color: var(--color-accent);
        font-weight: 500;
        margin-inline: 0.25rem;
      }

      &__sep {
        margin-inline: 0.25rem;
      }
    }
  `],
})
export class FooterComponent {
  protected readonly langService = inject(LanguageService);
}
