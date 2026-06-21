import { Component } from '@angular/core';
import { Hero } from './components/Hero/hero';
import { EventCard } from "../shared/ui/cards/event-card/event-card";
import { EventList } from "./components/EventList/event-list";
import { NotificationOverlay } from "../shared/ui/overlays/notification-overlay/notification-overlay";
import { FavouritesOverlay } from "../shared/ui/overlays/favourites-overlay/favourites-overlay";

@Component({
  selector: 'app-home',
  imports: [Hero, EventCard, EventList, NotificationOverlay, FavouritesOverlay],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
