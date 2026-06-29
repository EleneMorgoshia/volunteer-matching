import {
  ConnectedPosition,
  Overlay,
  OverlayModule,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { NotificationCard } from '../../cards/notification-card/notification-card';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';
import { EventMatchResponse } from './notification.model';

@Component({
  selector: 'app-notification-overlay',
  imports: [OverlayModule, NotificationCard, MatIcon, CommonModule],
  templateUrl: './notification-overlay.html',
  styleUrl: './notification-overlay.scss',
})
export class NotificationOverlay {
  isOpen = false;
  overLay = inject(Overlay);
  notifications$!: Observable<EventMatchResponse>;

  private notificationService = inject(NotificationService);

  activeTab: 'notifications' | 'matches' = 'notifications';
  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      // offsetY: 16,
    },
  ];

  // scrollStrategies =  inject(ScrollStrategyOptions);

  toggleOverlay() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.notifications$ = this.notificationService.getNotifications();
    }
  }

  close() {
    this.isOpen = false;
  }

  onAcceptMatch(matchId: string) {
    this.notificationService.acceptMatch(matchId).subscribe(() => {
      this.notifications$ = this.notificationService.getNotifications();
    });
  }

  onDeclineMatch(matchId: string) {
    this.notificationService.declineMatch(matchId).subscribe(() => {
      this.notifications$ = this.notificationService.getNotifications();
    });
  }
}
