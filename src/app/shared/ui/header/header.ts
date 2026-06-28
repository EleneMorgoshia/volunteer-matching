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
import { FavouritesOverlay } from '../overlays/favourites-overlay/favourites-overlay';
import { NotificationOverlay } from '../overlays/notification-overlay/notification-overlay';
import { FavouritesCard } from '../cards/favourites-card/favourites-card';
import {
  FavoriteEventModel,
  FavoriteEventsResponse,
} from '../cards/favourites-card/favorite-event.model';
@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FavouritesOverlay,
    NotificationOverlay,
    FavouritesCard,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userInfo$!: Observable<any>;
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  headerService = inject(HeaderService);
  isFavoritesOpen = false;
  isLogoutOpen = false;
  favoriteEvents$!: Observable<FavoriteEventsResponse>;

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

  openFavoritesOverlay() {
    this.isFavoritesOpen = true;
    this.favoriteEvents$ = this.headerService.getFavoriteEvents();
  }

  openLogoutOverlay() {
    this.isLogoutOpen = true;
  }

  onDeleteEvent(eventId: string) {
    this.headerService.deleteFavoriteEvent(eventId).subscribe((res) => {
      this.favoriteEvents$ = this.headerService.getFavoriteEvents();
    });
  }

  closeFavoritesOverlay() {
    this.isFavoritesOpen = false;
  }

  onLogout() {
    this.authService.logout();
  }
}
