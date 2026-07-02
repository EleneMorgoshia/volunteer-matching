import { Component, inject, OnInit } from '@angular/core';
import { Hero } from './components/Hero/hero';
import { EventCard } from '../shared/ui/cards/event-card/event-card';
import { EventList } from './components/EventList/event-list';
import { NotificationOverlay } from '../shared/ui/overlays/notification-overlay/notification-overlay';
import { FavouritesOverlay } from '../shared/ui/overlays/favourites-overlay/favourites-overlay';
import { Observable } from 'rxjs';
import { EventService } from '../features/profile/organisation/pages/organization-event/organization-event.service';
import { EventModel } from '../features/profile/organisation/pages/organization-event/organization-event.model';
import { CommonModule } from '@angular/common';
import { OrganizationMatchCard } from "../shared/ui/cards/organization-match-card/organization-match-card";

@Component({
  selector: 'app-home',
  imports: [Hero, EventList, CommonModule, OrganizationMatchCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  eventList$!: Observable<{ items: EventModel[] }>;
  private eventsService = inject(EventService);

  ngOnInit(): void {
    this.eventList$ = this.eventsService.getEvents();
  }
}
