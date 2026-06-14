import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { OrganizationModel, OrganizationParams } from './organization-profile.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);

  readonly firstLetterSignal = signal<string>('');
  readonly profileSignal = signal<OrganizationModel | null>(null);

  getProfileInfo() {
    return this.http
      .get<OrganizationModel>(this.url + '/organizations/me')
      .pipe(tap((res) => this.setProfileInfo(res)));
  }

  updateProfile(params: OrganizationParams) {
    return this.http.put<OrganizationModel>(this.url + '/organizations/me', params);
  }

  private setProfileInfo(info: OrganizationModel) {
    this.firstLetterSignal.set(info.organizationName.charAt(0).toUpperCase());
    this.profileSignal.set(info);
  }
}
