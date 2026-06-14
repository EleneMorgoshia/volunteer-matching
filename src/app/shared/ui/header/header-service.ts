import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { OrganizationProfileService } from '../../../features/profile/organisation/pages/organization-profile/organization-profile.service';
import { VolunteerProfileService } from '../../../features/profile/volunteer/pages/voluteer-profile/volunteer-profile.service';
import { Observable } from 'rxjs';
import { OrganizationModel } from '../../../features/profile/organisation/pages/organization-profile/organization-profile.model';
import { VolunteerModel } from '../../../features/profile/volunteer/pages/voluteer-profile/volunteer-profile.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private authService = inject(AuthService);
  private organizationProfileService = inject(OrganizationProfileService);
  private volunteerProfileService = inject(VolunteerProfileService);
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
}
