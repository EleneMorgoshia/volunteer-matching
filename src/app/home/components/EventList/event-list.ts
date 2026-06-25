import { Component, computed, input, output, signal } from '@angular/core';
import { EventCard } from '../../../shared/ui/cards/event-card/event-card';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { EventModel } from '../../../features/profile/organisation/pages/organization-event/organization-event.model';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, Pagination],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  events = input<EventModel[] | null>(null);
  canEdit = input(false);

  eventDeleted = output<void>();

  readonly currentPage = signal(1);

  readonly perPage = 12;

  readonly tmpArr = computed(() => {
    const events = this.events();

    if (!events) {
      return [];
    }

    const page = this.currentPage();

    return events.slice((page - 1) * this.perPage, page * this.perPage);
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
