import { Component, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-logout-overaly',
  imports: [MatIcon],
  templateUrl: './logout-overaly.html',
  styleUrl: './logout-overaly.scss',
})
export class LogoutOveraly {
  logout = output<void>();
  closeOverlay = output<void>();
}
