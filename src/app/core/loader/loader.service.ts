import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;

  readonly loading = signal<boolean>(false);

  start() {
    this.count++;
    this.loading.set(true);
    console.log('added loader: ', this.count);
  }

  close() {
    this.count--;
    console.log('stopped loader: ', this.count);
    if (this.count <= 0) {
      this.loading.set(false);
      this.count = 0;
      console.log('no loaders left');
    }
  }
}
