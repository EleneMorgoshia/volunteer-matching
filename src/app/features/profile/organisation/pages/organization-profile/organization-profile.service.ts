import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { OrganizationModel } from './organization-profile.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);
  private profileFirstLetter: string = '';

  getProfileInfo() {
    return this.http
      .get<OrganizationModel>(this.url + '/organizations/me')
      .pipe(tap((res) => this.setProfileInfo(res)));
  }

  private setProfileInfo(info: OrganizationModel) {
    this.profileFirstLetter = info.organizationName.charAt(0).toUpperCase();
  }

  getprofileFirstLetter() {
    return this.profileFirstLetter;
  }
}
