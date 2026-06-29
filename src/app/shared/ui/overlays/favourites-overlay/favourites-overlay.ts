import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-favourites-overlay',
  imports: [MatIcon],
  templateUrl: './favourites-overlay.html',
  styleUrl: './favourites-overlay.scss',
})
export class FavouritesOverlay {
  closeOverlay = output<void>();

  close() {
    this.closeOverlay.emit();
  }
}
