import { Component, input } from '@angular/core';
import { EventModel } from '../../../../models/event.model';

@Component({
  selector: 'app-favourites-card',
  imports: [],
  templateUrl: './favourites-card.html',
  styleUrl: './favourites-card.scss',
})
export class FavouritesCard {
  FavouriteEventDetails = input<Partial<EventModel>>();
}
