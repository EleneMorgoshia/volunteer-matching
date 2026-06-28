import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  RegisterModelResponse,
  RegistrationOrganisationInfo,
  RegistrationVolunteerInfo,
} from './registration.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = `${environment.url}`;
  private readonly http = inject(HttpClient);
  readonly authService = inject(AuthService);

  registerVolunteer(params: RegistrationVolunteerInfo) {
    return this.http
      .post<RegisterModelResponse>(this.apiUrl + '/auth/register/volunteer', params)
      .pipe(
        tap((resp) => {
          console.log('TOKEN RESPONSE:', resp);
          this.authService.setNewToken(resp);
        }),
      );
  }

  registerOrganisation(params: RegistrationOrganisationInfo) {
    return this.http
      .post<RegisterModelResponse>(this.apiUrl + '/auth/register/organization', params)
      .pipe(
        tap((resp) => {
          this.authService.setNewToken(resp);
        }),
      );
  }
}
