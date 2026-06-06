import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventCardModel } from './event-card.model';

@Component({
  selector: 'app-event-card',
  imports: [MatIconModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  event = signal<EventCardModel>({
    eventId: '1',
    title: 'Random Event Name',
    organizationName: 'Organisation Name',
    shortDescription:
      'A community networking event where participants come together to share ideas, build connections, and explore some collaboration...',
    location: 'Location',
    startDate: '2026-02-12',
    endDate: '2026-02-14',
    theme: 'Theme',
    mainPhotoUrl: '',
  });
}
