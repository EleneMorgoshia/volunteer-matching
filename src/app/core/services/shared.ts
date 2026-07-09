import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrl = `${environment.url}`;
  private readonly http = inject(HttpClient);

  getTags() {
    return this.http.get<{ tagId: string; name: string }[]>(this.apiUrl + '/tags');
  }

  getProfileOptions() {
    return this.http.get<{
      skills: { id: string; name: string }[];
      interests: { id: string; name: string }[];
    }>(this.apiUrl + '/volunteers/profile-options');
  }
}
 