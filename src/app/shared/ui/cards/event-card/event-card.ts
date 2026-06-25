import { Component, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventModel } from '../../../../features/profile/organisation/pages/organization-event/organization-event.model';
import { Router } from '@angular/router';
import { EventService } from '../../../../features/profile/organisation/pages/organization-event/organization-event.service';

@Component({
  selector: 'app-event-card',
  imports: [MatIconModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  eventItem = input<EventModel>();
  canEdit = input<boolean>(false);
  eventDeleted = output();
  private router = inject(Router);
  private eventsService = inject(EventService);
  onToggleFavorite() {
    if (this.canEdit()) {
      this.eventsService
        .deleteEvent(this.eventItem()?.eventId || '')
        .subscribe(() => this.eventDeleted.emit());
    } else {
      this.eventsService.favoriteEvent(this.eventItem()?.eventId).subscribe();
    }
    // todo: call favorite api
  }

  onNavigateToEventDetails() {
    if (this.canEdit() && this.eventItem()) {
      this.router.navigate(['organization/event/edit'], {
        queryParams: {
          eventId: this.eventItem()?.eventId,
        },
      });
    } else if (!this.canEdit()) {
      this.router.navigateByUrl('event/' + this.eventItem()?.eventId);
    }
  }
}
