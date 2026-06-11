import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { UpdateProfileParams, VolunteerModel } from '../voluteer-profile/volunteer-profile.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolunteerProfileService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);
  private profileFirstLetter: string = '';

  getProfileInfo() {
    return this.http
      .get<VolunteerModel>(this.url + '/volunteers/me')
      .pipe(tap((res) => (this.profileFirstLetter = res.firstName[0].toUpperCase())));
  }

  getprofileFirstLetter() {
    return this.profileFirstLetter;
  }

  updateProfile(params: UpdateProfileParams) {
    return this.http.put(this.url + '/volunteers/me', params);
  }
}
