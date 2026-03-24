import { Component, input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { EventModel } from '../../../../models/event.model';
@Component({
  selector: 'app-favourites-card',
  imports: [MatIconModule],
  templateUrl: './favourites-card.html',
  styleUrl: './favourites-card.scss',
})
export class FavouritesCard {
  eventDetails = input<Partial<EventModel>>();
}
