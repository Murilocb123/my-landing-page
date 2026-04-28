import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faLinkedin,
  type IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { LanguageService } from '../../services/language.service';

type Social = { name: string; url: string; icon: IconDefinition };

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaIconComponent],
})
export class ContactComponent {
  protected readonly langService = inject(LanguageService);
  protected readonly copied = signal(false);
  protected readonly email = 'murilocb1276@gmail.com';

  protected readonly socials: Social[] = [
    { name: 'GitHub',   url: 'https://github.com/Murilocb123', icon: faGithub   },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/murilo-costa-bittencourt-b7b7a0198', icon: faLinkedin },
  ];

  protected copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
