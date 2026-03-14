import {
  ConnectedPosition,
  Overlay,
  OverlayModule,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-notification-overlay',
  imports: [OverlayModule],
  templateUrl: './notification-overlay.html',
  styleUrl: './notification-overlay.scss',
})
export class NotificationOverlay {
  isOpen = false;
  overLay = inject(Overlay);

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
}
