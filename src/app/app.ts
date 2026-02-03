import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Card } from './shared/ui/cards/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressBarModule, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('VolunteerMatching');
  currentDate = new Date();

  constructor() {
    console.log(this.currentDate);
  }
}
