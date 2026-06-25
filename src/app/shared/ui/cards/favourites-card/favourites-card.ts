import { Component, input, output } from '@angular/core';
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
  deleteEvent = output();
}
