import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  /**
   * Tema atual. Ordem de prioridade no boot:
   *   1. localStorage (preferência manual já salva)
   *   2. prefers-color-scheme do sistema operacional
   *   3. fallback 'dark'
   */
  readonly theme = signal<Theme>(this.resolveInitialTheme());

  constructor() {
    /* Sincroniza o atributo data-theme no <html> e persiste a escolha
       toda vez que o signal mudar. */
    effect(() => {
      const t = this.theme();
      this.document.documentElement.setAttribute('data-theme', t);
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {
        /* SSR / privacy mode — silenciosamente ignora */
      }
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private resolveInitialTheme(): Theme {
    /* 1. preferência salva */
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      /* ignore */
    }

    /* 2. preferência do sistema (apenas no browser) */
    const win = this.document.defaultView;
    if (win?.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    /* 3. fallback */
    return 'dark';
  }
}
