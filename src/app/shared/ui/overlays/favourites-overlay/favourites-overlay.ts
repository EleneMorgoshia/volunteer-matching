import { Component } from '@angular/core';
import { FavouritesCard } from "../../cards/favourites-card/favourites-card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-favourites-overlay',
  imports: [FavouritesCard, MatIcon],
  templateUrl: './favourites-overlay.html',
  styleUrl: './favourites-overlay.scss',
})
export class FavouritesOverlay {

}
