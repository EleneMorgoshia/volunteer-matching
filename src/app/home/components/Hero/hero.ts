import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { OrganizationMatchCard } from "../../../shared/ui/cards/organization-match-card/organization-match-card";

@Component({
  selector: 'app-hero',
  imports: [OrganizationMatchCard],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
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
