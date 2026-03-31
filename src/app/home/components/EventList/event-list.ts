import { Component } from '@angular/core';
import { EventCard } from '../../../shared/ui/cards/event-card/event-card';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  //todo: აქ დავამატოთ ინფუთები ამ შემტხვევაში ევენთ ქარდების მასივი

  tmpArr: number[] = new Array(12).fill(0); // ეგ წასაშლელია
}
