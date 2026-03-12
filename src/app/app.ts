import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './core/loader/loader';
import { Header } from './shared/ui/header/header';
import { Footer } from './shared/ui/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('VolunteerMatching');
}
