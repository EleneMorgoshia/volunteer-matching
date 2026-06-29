import { Component, input, output } from '@angular/core';
// import { EventModel } from '../../../../models/event.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrganizationNotificationModel } from './notification-card.model';
import { Item } from '../../overlays/notification-overlay/notification.model';

@Component({
  selector: 'app-notification-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.scss',
})
export class NotificationCard {
  // eventDetails = input<Partial<EventModel>>();
  //ამის მოდელის აღწერა ჩამიგდო ანამ და მაგიტომ შევცვალე და მაგ txtსაც განახებ,
  //ზემოთა მაგიტომ დავაკომნეტარე რო რამე შევცვალოთ
  notification = input<Item>();
  accept = output<void>();
  decline = output<void>();
}
