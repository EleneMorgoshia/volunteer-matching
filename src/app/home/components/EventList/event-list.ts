import { Component, OnInit } from '@angular/core';
import { EventCard } from '../../../shared/ui/cards/event-card/event-card';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { NotificationCard } from "../../../shared/ui/cards/notification-card/notification-card";
import { FavouritesCard } from "../../../shared/ui/cards/favourites-card/favourites-card";

@Component({
  selector: 'app-event-list',
  imports: [EventCard, Pagination, NotificationCard, FavouritesCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList implements OnInit {
  //todo: აქ დავამატოთ ინფუთები ამ შემტხვევაში ევენთ ქარდების მასივი
  currentPage = 1;
  perPage = 12;

  allCards: number[] = [];
  tmpArr: number[] = []; // ეგ წასაშლელია

  onPageChange(page: number) {
    this.currentPage = page;
    this.handlePageChange(page);
  }

  ngOnInit(): void {
    for (let i = 1; i < 29; i++) {
      this.allCards.push(i);
    }
    this.handlePageChange(1);
  }

  private handlePageChange(page: number) {
    this.tmpArr = this.allCards.slice(
      (this.currentPage - 1) * this.perPage, //0
      this.currentPage * this.perPage, //
    );
  }
}
