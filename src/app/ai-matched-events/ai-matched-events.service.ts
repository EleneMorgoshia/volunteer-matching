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

  private authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  // /volunteers/me/matches?page=1&pageSize=6
  // /organizations/me/events/cfbed559-4e24-42c2-afff-f460a0956505/matches?page=1&pageSize=6'

  aiMatch(id?: string) {
    let url = this.apiUrl;
    if (this.authService.isOrganization()) {
      url = url + `/organizations/me/events/${id}/matches/generate`;
    } else {
      url = url + '/volunteers/me/matches/generate';
    }
    return this.http.post(url, {});
  }

  getMatches(page = 1, pageSize = 6, id?: string) {
    return this.http.get<MatchedEvents>(
      this.apiUrl + `/volunteers/me/matches?page=${page}&pageSize=${pageSize}`,
    );
  }
}
