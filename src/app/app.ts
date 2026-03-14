import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './core/loader/loader';
import { Header } from './shared/ui/header/header';
import { Footer } from './shared/ui/footer/footer';
import { NotificationCard } from './shared/ui/cards/notification-card/notification-card';
import { EventModel } from './models/event.model';
import { FavouritesCard } from './shared/ui/cards/favourites-card/favourites-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Loader, NotificationCard, FavouritesCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('VolunteerMatching');
  eventExample: Partial<EventModel>[] = [
    {
      eventPhoto: 'assets/images/event-photo.jpg',
      eventTitle: 'Youth Volunteering Workshop',
      organizationName: 'Future Leaders Organization',
      eventDateTime: new Date('2026-04-10'),
      eventLastingPeriod: new Date('2026-04-10'),
      status: false,
      eventDescription:
        'A workshop where young volunteers learn teamwork and community engagement.',
    },
    {
      eventPhoto: 'assets/images/event-photo.jpg',
      eventTitle: 'Youth Volunteering Workshop 2',
      organizationName: 'Future Leaders Organization 2',
      eventDateTime: new Date('2026-04-10'),
      eventLastingPeriod: new Date('2026-04-10'),
      status: true,
      eventDescription:
        'A workshop where young volunteers learn teamwork and community engagement.',
    },
  ];
}
