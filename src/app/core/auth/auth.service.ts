import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { loginModelParams, loginModelResponse, ROLE } from './auth.model';
import { BehaviorSubject, ReplaySubject, tap } from 'rxjs';
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
  isLoggedInSubject$ = new BehaviorSubject<boolean>(false);

  login(params: loginModelParams) {
    return this.http.post<loginModelResponse>(this.apiUrl + '/login', params).pipe(
      tap((resp) => {
        this.setNewToken(resp);
      }),
    );
  }

  // ანას ვკითხოთ,
  // სვაგერში ვერ ვნახეთ და როცა ერორი იქნება,
  // თუ ეს ერორი ტოკენის ბრალი არაა 401-სგან განსხვავებული ერორ კოდი რომ დაბრუნდეს
  logout() {
    [this.accessToken, this.user, this.role].forEach((el) => localStorage.removeItem(el));
    this.isLoggedInSubject$.next(false);
    this.router.navigate(['/login']);
  }

  setNewToken(resp: loginModelResponse) {
    console.log('Seinaxe tokeni:', resp);

    localStorage.setItem(this.accessToken, resp.accessToken);
    localStorage.setItem(this.user, resp.userId);
    localStorage.setItem(this.role, resp.role);

    this.accessTknSignal.set(resp.accessToken);
    this.userId.set(resp.userId);
    this.userRole.set(resp.role);

    console.log(
      localStorage.getItem(this.accessToken),
      localStorage.getItem(this.user),
      localStorage.getItem(this.role),
    );
    // this.navigateToCorrectProfile();
    this.isLoggedInSubject$.next(true);
  }

  navigateToCorrectProfile() {
    const role = this.userRole();

    console.log('role before navigation:', role);

    if (role === ROLE.ORGANIZATION) {
      this.router.navigate(['/organization/profile']);
      return;
    }

    if (role === ROLE.VOLUNTEER) {
      this.router.navigate(['/volunteer/profile']);
      return;
    }

    console.log('Unknown role:', role);
  }

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
