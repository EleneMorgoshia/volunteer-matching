import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-hero',
  imports: [],
  templateUrl: './about-hero.html',
  styleUrl: './about-hero.scss',
})
export class AboutHero {
 private readonly router = inject(Router);

  onNavigateToAiMatched(): void {
    this.router.navigate(['/ai-matched-events']);
  }
}
