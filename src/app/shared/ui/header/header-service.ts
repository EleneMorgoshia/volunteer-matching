import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { OrganizationProfileService } from '../../../features/profile/organisation/pages/organization-profile/organization-profile.service';
import { VolunteerProfileService } from '../../../features/profile/volunteer/pages/voluteer-profile/volunteer-profile.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private authService = inject(AuthService);
  private organizationProfileService = inject(OrganizationProfileService);
  private volunteerProfileService = inject(VolunteerProfileService);

  getCurrentUserInfo() {
    if (this.authService.isOrganization()) {
      return this.organizationProfileService.getprofileFirstLetter();
    }
    return this.volunteerProfileService.getprofileFirstLetter();
  }
}
