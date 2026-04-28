import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

type NavItem = {
  id: 'home' | 'about' | 'projects' | 'stack' | 'contact';
  labelKey: 'home' | 'about' | 'projects' | 'stack' | 'contact';
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  host: { class: 'block' },
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  protected readonly langService = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
  protected readonly isScrolled = signal(false);
  protected readonly activeSection = signal('home');
  protected readonly menuOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { id: 'home', labelKey: 'home' },
    { id: 'about', labelKey: 'about' },
    { id: 'projects', labelKey: 'projects' },
    { id: 'contact', labelKey: 'contact' },
  ];

  /**
   * Ordem REAL das seções no DOM (vem de app.html):
   *   hero(home) → skills-marquee(stack) → about → projects → contact
   * Importante manter sincronizado: o fallback rAF e o pickActive dependem
   * dessa ordem para decidir corretamente quando várias seções estão na trip-line.
   */
  private readonly sectionOrder: readonly string[] = [
    'home',
    'stack',
    'about',
    'projects',
    'contact',
  ];

  private observer: IntersectionObserver | null = null;
  private rafId: number | null = null;

  private scrollHandler = () => {
    this.isScrolled.set(window.scrollY > 80);
    this.scheduleActiveRecalc();
  };

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    /* O IO existe só pra disparar um recálculo quando alguma seção cruza
       a trip-line. A decisão real de qual seção está ativa é sempre feita
       em computeActive() — fonte única da verdade, evita race entre IO e rAF. */
    this.observer = new IntersectionObserver(
      () => this.scheduleActiveRecalc(),
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 },
    );

    /* As seções siblings (#home, #about, #projects, etc.) só existem no DOM
       depois que <app-navbar> termina seu próprio init — por isso usamos
       AfterViewInit + um requestAnimationFrame para garantir que o layout
       esteja pronto antes de chamar getElementById/observe. */
    requestAnimationFrame(() => this.observeSections());

    /* primeira leitura: garante estado correto sem precisar rolar */
    this.scheduleActiveRecalc();
  }

  /** IDs já observados pelo IO (evita observe() redundante em retentativas). */
  private readonly observedIds = new Set<string>();

  /** Tenta observar todas as seções; se alguma ainda não estiver no DOM, agenda nova tentativa. */
  private observeSections(): void {
    if (!this.observer) return;
    let pending = 0;
    for (const id of this.sectionOrder) {
      if (this.observedIds.has(id)) continue;
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
        this.observedIds.add(id);
      } else {
        pending++;
      }
    }
    if (pending > 0) {
      /* alguma seção ainda não foi montada — tenta de novo no próximo frame */
      requestAnimationFrame(() => this.observeSections());
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    this.observer?.disconnect();
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  /** Recalcula (throttled em rAF) e atualiza a seção ativa. */
  private scheduleActiveRecalc(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.activeSection.set(this.computeActive());
    });
  }

  /**
   * Decide qual seção deve estar ativa, em ordem de prioridade:
   *   1. Fim da página → última seção (resolve seções curtas no rodapé,
   *      como contact, cuja `top` nunca cruza a trip-line em telas grandes).
   *   2. Topo absoluto → primeira seção (estado inicial limpo).
   *   3. Caso geral → última seção cuja `top` já passou pela trip-line
   *      (~30% do topo do viewport).
   */
  private computeActive(): string {
    const last = this.sectionOrder[this.sectionOrder.length - 1];

    /* fim da página: tolerância de 4px pra arredondamento sub-pixel */
    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= docHeight - 4) return last;

    /* topo absoluto */
    if (window.scrollY <= 4) return this.sectionOrder[0];

    /* caso geral: trip-line a 30% do topo */
    const trigger = window.innerHeight * 0.3;
    let active = this.sectionOrder[0];
    for (const id of this.sectionOrder) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= trigger) active = id;
    }
    return active;
  }

  protected scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  protected toggleLang(): void {
    this.langService.toggle();
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
