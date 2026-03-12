import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  loader = inject(LoaderService);
}
