import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';

type Social = { name: string; url: string; icon: string };

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly langService = inject(LanguageService);
  protected readonly copied = signal(false);
  protected readonly email = 'murilocb1276@gmail.com';

  protected readonly socials: Social[] = [
    { name: 'GitHub',   url: 'https://github.com/Murilocb123',      icon: '/icons/github.svg'   },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/murilo',       icon: '/icons/linkedin.svg' },
  ];

  protected copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
