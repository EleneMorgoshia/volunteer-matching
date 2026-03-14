import { Component, input } from '@angular/core';
import { EventModel } from '../../../../models/event.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notification-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.scss',
})
export class NotificationCard {
  eventDetails = input<Partial<EventModel>>();
}
