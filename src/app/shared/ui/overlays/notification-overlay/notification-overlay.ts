import {
  ConnectedPosition,
  Overlay,
  OverlayModule,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { NotificationCard } from "../../cards/notification-card/notification-card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-notification-overlay',
  imports: [OverlayModule, NotificationCard, MatIcon],
  templateUrl: './notification-overlay.html',
  styleUrl: './notification-overlay.scss',
})
export class NotificationOverlay {
  isOpen = false;
  overLay = inject(Overlay);

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
  }

  close() {
    this.isOpen = false;
  }
}
