import { inject, Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatchedDetails, MatchedEvents } from './ai-matched-events.model';

@Injectable({
  providedIn: 'root',
})
export class AiMatchService {
  private apiUrl = `${environment.url}`;

  authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  // /volunteers/me/matches?page=1&pageSize=6
  // /organizations/me/events/cfbed559-4e24-42c2-afff-f460a0956505/matches?page=1&pageSize=6'

  aiMatch(id: string | null) {
    let url = this.apiUrl;
    if (this.authService.isOrganization()) {
      url = url + `/organizations/me/events/${id}/matches/generate`;
    } else {
      url = url + '/volunteers/me/matches/generate';
    }
    return this.http.post(url, {});
  }

  getMatches(page = 1, pageSize = 6, id: string | null) {
    if (this.authService.isOrganization()) {
      return this.http.get<any>(
        this.apiUrl + `/organizations/me/events/${id}/matches?page=${page}&pageSize=${pageSize}`,
      );
    }
    return this.http.get<MatchedEvents>(
      this.apiUrl + `/volunteers/me/matches?page=${page}&pageSize=${pageSize}`,
    );
  }

  requestForVolunteer(id: string) {
    return this.http.post(this.apiUrl + `/volunteers/me/matches/${id}/request`, {});
  }

  rejectForVolunteer(id: string) {
    return this.http.post(this.apiUrl + `/volunteers/me/matches/${id}/reject`, {});
  }
}
