import { AfterViewInit, ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { HeaderService } from './header-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userInfo$!: Observable<any>;

  private authService = inject(AuthService);
  headerService = inject(HeaderService);
  firstLetter = '';

  ngOnInit(): void {
    this.firstLetter = this.headerService.getCurrentUserInfo();
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
