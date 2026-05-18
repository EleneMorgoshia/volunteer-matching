import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { loginModelParams, loginModelResponse, ROLE } from './auth.model';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.url}`;
  private readonly accessToken = 'access_token';
  private readonly user = 'user_info';
  private readonly role = 'user_role';

  private readonly accessTknSignal = signal<string | null>(localStorage.getItem(this.accessToken));
  private readonly userId = signal<string | null>(localStorage.getItem(this.user));
  private readonly userRole = signal<string | null>(localStorage.getItem(this.role));

  private isOrganizationAuthenticated = computed(() => this.userRole() === ROLE.ORGANIZATION);
  private isVolunteerAuthenticated = computed(() => this.userRole() === ROLE.VOLUNTEER);

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  login(params: loginModelParams) {
    return this.http.post<loginModelResponse>(this.apiUrl + '/login', params).pipe(
      tap((resp) => {
        this.saveToken(resp);
        this.router.navigate(
          this.isOrganization() ? ['organization/profile'] : ['volunteer/profile'],
        );
      }),
    );
  }

  // ანას ვკითხოთ,
  // სვაგერში ვერ ვნახეთ და როცა ერორი იქნება,
  // თუ ეს ერორი ტოკენის ბრალი არაა 401-სგან განსხვავებული ერორ კოდი რომ დაბრუნდეს
  logout() {
    [this.accessToken, this.user, this.role].forEach((el) => localStorage.removeItem(el));
    this.router.navigate(['/login']);
  }

  register() {}

  getUserId() {
    return this.userId();
  }

  getAccessToken() {
    return this.accessTknSignal();
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }

  isVolunteer() {
    return this.isVolunteerAuthenticated();
  }

  isOrganization() {
    return this.isOrganizationAuthenticated();
  }

  private saveToken(resp: loginModelResponse) {
    localStorage.setItem(this.accessToken, resp.accessToken);
    localStorage.setItem(this.user, resp.userId);
    localStorage.setItem(this.role, resp.role);
  }
}
