import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventModel } from '../../../../models/event.model';
import { FavoriteEventModel } from './favorite-event.model';
@Component({
  selector: 'app-favourites-card',
  imports: [MatIconModule],
  templateUrl: './favourites-card.html',
  styleUrl: './favourites-card.scss',
})
export class FavouritesCard {
  // eventDetails = input<Partial<EventModel>>();
  //ზედა დავაკომენტარე იმიტორო მაშინ არ გვქონდა დატა ბექის ახლა გვაქვს და ეგ აღწერილი დავაიმპორტე აქ
  favoriteEvent = input<FavoriteEventModel>();

  //სატესტოდ:
  testEvent: FavoriteEventModel = {
    isFavorite: true,
    eventId: '1',
    title: 'Random Event Name',
    organizationName: 'Organisation Name',
    shortDescription:
      'A community networking event where participants come together to share ideas...',
    location: 'Location',
    startDate: '2026/02/12',
    endDate: '2026/02/14',
    theme: 'Theme',
    mainPhotoUrl: '',
  };
}
