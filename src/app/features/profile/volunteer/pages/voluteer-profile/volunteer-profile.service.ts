import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { UpdateProfileParams, VolunteerModel } from '../voluteer-profile/volunteer-profile.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolunteerProfileService {
  private readonly url = `${environment.url}`;
  private http = inject(HttpClient);
  readonly firstLetterSignal = signal<string>('');
  readonly profileSignal = signal<VolunteerModel | null>(null);

  getProfileInfo() {
    return this.http.get<VolunteerModel>(this.url + '/volunteers/me').pipe(
      tap((res) => {
        this.firstLetterSignal.set(res.firstName[0].toUpperCase());
        this.profileSignal.set(res);
      }),
    );
  }

  updateProfile(params: UpdateProfileParams) {
    return this.http.put(this.url + '/volunteers/me', params);
  }
}
