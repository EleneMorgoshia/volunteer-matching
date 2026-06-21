import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventModel, EventParams } from './organization-event.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);

  createEvent(params: EventParams) {
    return this.http.post<any>(this.url + '/organizations/me/events', params);
  }

  updateEvent(params: EventParams, eventId: string) {
    return this.http.put<any>(this.url + '/organizations/me/events/' + eventId, params);
  }

  deleteEvent(id: string) {
    return this.http.delete<any>(this.url + '/organizations/me/events/' + id);
  }

  getOrganizationEvents() {
    return this.http.get<EventModel[]>(this.url + '/organizations/me/events');
  }

  getOrganizationEventDetails(id: string) {
    return this.http.get<EventModel>(this.url + '/organizations/me/events/' + id);
  }
}
