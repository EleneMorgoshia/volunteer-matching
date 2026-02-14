import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './core/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('VolunteerMatching');
}
