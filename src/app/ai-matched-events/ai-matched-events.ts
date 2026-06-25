import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EventList } from '../home/components/EventList/event-list';
import { EventModel } from '../features/profile/organisation/pages/organization-event/organization-event.model';

@Component({
  selector: 'app-ai-matched-events',
  imports: [MatIcon, EventList],
  templateUrl: './ai-matched-events.html',
  styleUrl: './ai-matched-events.scss',
})
export class AiMatchedEvents {
  events = input<EventModel[]>([]);
}