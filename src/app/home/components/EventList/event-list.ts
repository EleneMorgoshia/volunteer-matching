import { Component, input, Input, OnInit } from '@angular/core';
import { EventCard } from '../../../shared/ui/cards/event-card/event-card';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { NotificationCard } from '../../../shared/ui/cards/notification-card/notification-card';
import { FavouritesCard } from '../../../shared/ui/cards/favourites-card/favourites-card';
import { FavouritesOverlay } from '../../../shared/ui/overlays/favourites-overlay/favourites-overlay';
import { EventModel } from '../../../features/profile/organisation/pages/organization-event/organization-event.model';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, Pagination, NotificationCard, FavouritesCard, FavouritesOverlay],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList implements OnInit {
  //todo: აქ დავამატოთ ინფუთები ამ შემტხვევაში ევენთ ქარდების მასივი
  currentPage = 1;
  perPage = 12;
  @Input() events!: EventModel[];
  canEdit = input<boolean>(false);

  tmpArr: EventModel[] = [];

  onPageChange(page: number) {
    this.currentPage = page;
    this.handlePageChange(page);
  }

  ngOnInit(): void {
    this.handlePageChange(1);
  }

  private handlePageChange(page: number) {
    this.tmpArr = this.events.slice(
      (this.currentPage - 1) * this.perPage, //0
      this.currentPage * this.perPage, //
    );
  }
}
