import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import {VolunteerModel} from '../voluteer-profile/volunteer-profile.model'

@Injectable({
  providedIn: 'root',
})
export class VolunteerProfileService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);

  getProfileInfo() {
    return this.http.get<VolunteerModel>(this.url + '/volunteers/me');
  }
}
