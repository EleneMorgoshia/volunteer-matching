import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { OrganizationModel } from './organization-profile.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);

  getProfileInfo() {
    return this.http.get<OrganizationModel>(this.url + '/organizations/me');
  }
}
