import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';

type NavItem = {
  id: 'home' | 'about' | 'work' | 'stack' | 'contact';
  labelKey: 'home' | 'about' | 'work' | 'stack' | 'contact';
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected readonly langService = inject(LanguageService);
  protected readonly isScrolled = signal(false);
  protected readonly activeSection = signal('home');
  protected readonly menuOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { id: 'about', labelKey: 'about' },
    { id: 'work', labelKey: 'work' },
    { id: 'contact', labelKey: 'contact' },
  ];

  private observer: IntersectionObserver | null = null;
  private scrollHandler = () => this.isScrolled.set(window.scrollY > 80);

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) this.activeSection.set(e.target.id);
        });
      },
      { threshold: 0.3 },
    );

    ['home', 'about', 'work', 'stack', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    this.observer?.disconnect();
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
}
