import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventModel, EventParams } from './organization-event.model';
import { environment } from '../../../../../../environments/environment';
import { EventEditModel } from '../organization-event-edit/organization-event-edit-model';
import { EventCardModel } from '../../../../../shared/ui/cards/event-card/event-card.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);

  createEvent(params: EventParams) {
    return this.http.post<any>(this.url + '/organizations/me/events', {
      ...params,
      showSnackBar: true,
    });
  }

  updateEvent(params: EventParams, eventId: string) {
    return this.http.put<any>(this.url + '/organizations/me/events/' + eventId, {
      ...params,
      showSnackBar: true,
    });
  }

  deleteEvent(id: string) {
    return this.http.delete<any>(this.url + '/organizations/me/events/' + id, {
      params: { showSnackBar: true },
    });
  }

  getOrganizationEvents() {
    return this.http.get<EventModel[]>(this.url + '/organizations/me/events');
  }

  getOrganizationEventDetails(id: string) {
    return this.http.get<EventModel>(this.url + '/organizations/me/events/' + id);
  }

  favoriteEvent(eventId: string | undefined) {
    return this.http.post<any>(this.url + '/volunteers/me/favorites/' + eventId, {
      showSnackBar: true,
    });
  }

  getEvents(page = 1, pageSize = 9) {
    return this.http.get<{ items: EventModel[] }>(
      this.url + `/events?page=${page}&pageSize=${pageSize}`,
    );
  }
}
