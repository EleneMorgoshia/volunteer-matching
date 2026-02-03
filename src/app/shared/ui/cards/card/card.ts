import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, MatButton, MatIconModule, CommonModule],
  // providers: [{ provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'longDate' } }],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  /*
   * todo: დავამატოთ ინფუთები სიგნალებად
   * !საბოლოო ვერსიაში უნდა გამოვაყოლოთ მთელი ივენთის ობიექტი!
   * სავარჯიშოდ:
   * სურათი, სახელწოდება, დესქრიფშენი, დაგულებულია თუ არა
   */

  eventImage = input<string>();
  eventName = input<string>();
  organisationName = input<string>();
  theme = input<string>();
  eventDescription = input<string>();
  date = input<Date>();
  hearted = input<boolean>(false);
  selected = true;

  get imagePath() {
    return this.eventImage();
  }
}
