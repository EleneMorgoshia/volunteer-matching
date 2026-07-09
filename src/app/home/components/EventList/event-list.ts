import { Component, computed, input, output, signal } from '@angular/core';
import { EventCard } from '../../../shared/ui/cards/event-card/event-card';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { EventModel } from '../../../features/profile/organisation/pages/organization-event/organization-event.model';
import { MatchedDetails, MatchedEvents } from '../../../ai-matched-events/ai-matched-events.model';
import { VolunteerMatchCard } from '../../../shared/ui/cards/volunteer-match-card/volunteer-match-card';
import { OrganizationMatchCard } from '../../../shared/ui/cards/organization-match-card/organization-match-card';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, Pagination, VolunteerMatchCard, OrganizationMatchCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  events = input<EventModel[] | MatchedEvents | null>(null);
  canEdit = input(false);
  isMatchVolunteer = input(false);
  isMatchOrg = input(false);

  eventDeleted = output<void>();
  requestMatch = output<string>();
  rejectMatch = output<string>();

  readonly currentPage = signal(1);

  readonly perPage = 12;

  readonly tmpArr = computed(() => {
    const events = this.events();

    if (!events) {
      return [];
    }

    const page = this.currentPage();
    if (this.isMatchedEvents(events)) {
      return events.items.slice((page - 1) * this.perPage, page * this.perPage);
    }
    return events.slice((page - 1) * this.perPage, page * this.perPage);
  });

  readonly isNormalEvents = computed(() => {
    const events = this.events();

    return !!events && !this.isMatchedEvents(events);
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  isMatchedEvents(events: EventModel[] | MatchedEvents | null): events is MatchedEvents {
    return !!events && !Array.isArray(events);
  }


}
