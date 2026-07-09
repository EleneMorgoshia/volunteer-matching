import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { OrganizationProfileService } from '../../../features/profile/organisation/pages/organization-profile/organization-profile.service';
import { VolunteerProfileService } from '../../../features/profile/volunteer/pages/voluteer-profile/volunteer-profile.service';
import { Observable } from 'rxjs';
import { OrganizationModel } from '../../../features/profile/organisation/pages/organization-profile/organization-profile.model';
import { VolunteerModel } from '../../../features/profile/volunteer/pages/voluteer-profile/volunteer-profile.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  FavoriteEventModel,
  FavoriteEventsResponse,
} from '../cards/favourites-card/favorite-event.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private apiUrl = `${environment.url}`;
  private authService = inject(AuthService);
  private organizationProfileService = inject(OrganizationProfileService);
  private volunteerProfileService = inject(VolunteerProfileService);
  private http = inject(HttpClient);
  
  readonly firstLetter = computed(
    () =>
      this.organizationProfileService.firstLetterSignal() ||
      this.volunteerProfileService.firstLetterSignal(),
  );

  getCurrentProfile(): Observable<OrganizationModel | VolunteerModel> {
    if (this.authService.isOrganization()) {
      return this.organizationProfileService.getProfileInfo();
    }
    return this.volunteerProfileService.getProfileInfo();
  }

  getFavoriteEvents(page = 1, pageSize = 50) {
    return this.http.get<FavoriteEventsResponse>(
      this.apiUrl + `/volunteers/me/favorites?page=${page}&pageSize=${pageSize}`,
    );
  }

  deleteFavoriteEvent(eventId: string) {
    return this.http.delete(this.apiUrl + `/volunteers/me/favorites/${eventId}`);
  }
}
