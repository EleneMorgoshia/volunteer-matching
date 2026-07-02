import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-about-hero',
  imports: [],
  templateUrl: './about-hero.html',
  styleUrl: './about-hero.scss',
})
export class AboutHero {
 private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  onNavigateToAiMatched(): void {
    if (this.authService.isOrganization()) {
      this.router.navigate(['/organization/profile']);
      return;
    }

    this.router.navigate(['/ai-matched-events']);
  }
}
