import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../core/auth/auth.service';
import { EventMatchResponse } from './notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = `${environment.url}`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  acceptMatch(matchId: string) {
    let url = this.apiUrl;
    if (this.authService.isOrganization()) {
      url += `/organizations/me/matches/${matchId}/accept`;
    } else {
      url += `/volunteers/me/matches/${matchId}/accept`;
    }
    return this.http.post(url, { showSnackBar: true });
  }

  declineMatch(matchId: string) {
    let url = this.apiUrl;
    if (this.authService.isOrganization()) {
      url += `/organizations/me/matches/${matchId}/decline`;
    } else {
      url += `/volunteers/me/matches/${matchId}/decline`;
    }
    return this.http.post(url, { showSnackBar: true });
  }

  getNotifications(incomingPage = 1, acceptedPage = 1, pageSize = 6) {
    let url = this.apiUrl;
    if (this.authService.isOrganization()) {
      url += `/organizations/me/notifications?incomingPage=${incomingPage}&acceptedPage=${acceptedPage}&pageSize=${pageSize}`;
    } else {
      url += `/volunteers/me/notifications?incomingPage=${incomingPage}&acceptedPage=${acceptedPage}&pageSize=${pageSize}`;
    }
    return this.http.get<EventMatchResponse>(url);
  }
}
