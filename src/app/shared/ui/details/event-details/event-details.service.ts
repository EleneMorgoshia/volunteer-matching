import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EventDetailModel } from './event-details-model';

@Injectable({
  providedIn: 'root',
})
export class EventDetailsService {
  private apiUrl = `${environment.url}`;
  private http = inject(HttpClient);

  getEventDetails(eventId: string) {
    return this.http.get<EventDetailModel>(this.apiUrl + '/events/' + eventId);
  }
}
