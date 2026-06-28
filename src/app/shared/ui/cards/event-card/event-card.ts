import { Component, computed, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { EventModel } from '../../../../features/profile/organisation/pages/organization-event/organization-event.model';
import { EventService } from '../../../../features/profile/organisation/pages/organization-event/organization-event.service';
import { MatchedDetails } from '../../../../ai-matched-events/ai-matched-events.model';

@Component({
  selector: 'app-event-card',
  imports: [MatIconModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  eventItem = input<EventModel | MatchedDetails>();

  canEdit = input<boolean>(false);
  eventDeleted = output<void>();

  private router = inject(Router);
  private eventsService = inject(EventService);

  readonly event = computed<Partial<EventModel> | undefined>(() => {
    const item = this.eventItem();

    if (!item) {
      return undefined;
    }

    if ('event' in item) {
      return item.event;
    }

    return item;
  });

  onAIMatch() {
    const eventId = this.event()?.eventId;
    this.router.navigateByUrl('ai-matched-events/' + eventId);
  }

  onToggleFavorite() {
    const eventId = this.event()?.eventId;

    if (!eventId) {
      return;
    }

    if (this.canEdit()) {
      this.eventsService.deleteEvent(eventId).subscribe(() => this.eventDeleted.emit());
    } else {
      this.eventsService.favoriteEvent(eventId).subscribe();
    }
  }

  onNavigateToEventDetails() {
    const eventId = this.event()?.eventId;

    if (!eventId) {
      return;
    }

    if (this.canEdit()) {
      this.router.navigate(['organization/event/edit'], {
        queryParams: { eventId },
      });
    } else {
      this.router.navigateByUrl('event/' + eventId);
    }
  }
}
