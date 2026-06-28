import { Component, computed, inject, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatchedDetails } from '../../../../ai-matched-events/ai-matched-events.model';
import { Router } from '@angular/router';
import { EventService } from '../../../../features/profile/organisation/pages/organization-event/organization-event.service';
import { EventModel } from '../../../../features/profile/organisation/pages/organization-event/organization-event.model';

@Component({
  selector: 'app-volunteer-match-card',
  imports: [MatIcon],
  templateUrl: './volunteer-match-card.html',
  styleUrl: './volunteer-match-card.scss',
})
export class VolunteerMatchCard {
  eventItem = input<EventModel | MatchedDetails>();
  requestMatch = output<string>();
  rejectMatch = output<string>();

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

  readonly matchEventId = computed<string>(() => {
    const item = this.eventItem();

    if (!item) {
      return '';
    }

    if ('event' in item) {
      return item.volunteerEventMatchId;
    }
    return '';
  });

  onToggleFavorite() {
    const eventId = this.event()?.eventId;

    if (!eventId) {
      return;
    }

    this.eventsService.favoriteEvent(eventId).subscribe();
  }

  onNavigateToEventDetails() {
    const eventId = this.event()?.eventId;

    if (!eventId) {
      return;
    }

    this.router.navigateByUrl('event/' + eventId);
  }
}
