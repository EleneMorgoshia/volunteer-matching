import { Component, DestroyRef, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HeaderService } from './header-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userInfo$!: Observable<any>;
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  headerService = inject(HeaderService);

  constructor() {
    this.authService.isLoggedInSubject$.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.isLoggedIn()) {
        this.headerService.getCurrentProfile().subscribe();
      }
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.headerService.getCurrentProfile().subscribe();
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isOrganization() {
    return this.authService.isOrganization();
  }

  // profileLink() {
  //   return this.authService.isOrganization() ? '/organization/profile' : '/volunteer/profile';
  // }
}
