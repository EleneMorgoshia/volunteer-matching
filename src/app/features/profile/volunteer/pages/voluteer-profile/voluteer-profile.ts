import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluteer-profile',
  imports: [MatIconModule],
  templateUrl: './voluteer-profile.html',
  styleUrl: './voluteer-profile.scss',
})
export class VoluteerProfile {
  private router = inject(Router);
  onNavigateToEdit() {
    this.router.navigateByUrl('volunteer/edit').then();
  }
}
