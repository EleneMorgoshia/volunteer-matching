import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { LoginInfo } from './login.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    FormField,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginModel = signal<LoginInfo>({
    email: '',
    password: '',
  });

  // loginForm = form(this.loginModel);
  // authService = inject(AuthService);
  // router = inject(Router);
  // showInfo = signal(false);

  // constructor() {
  //   effect(() => {
  //     console.log(this.loginForm.email());
  //     console.log(this.loginForm.password().value());
  //     console.log(this.loginForm().value());
  //   });
  // }

  // onLogin() {
  //   console.log('login');
  //   console.log(this.loginForm.email());
  //   console.log(this.loginForm.password());
  //   this.authService
  //     .login(this.loginForm().value())
  //     .subscribe((res) => this.authService.navigateToCorrectProfile());
  // }

  // onRegiter() {
  //   this.router.navigate(['/registration'], {
  //     queryParams: { role: 'volunteer' },
  //   });
  // }

  // openInfo() {
  //   this.showInfo.set(true);
  // }

  // closeInfo() {
  //   this.showInfo.set(false);
  // }

  formSubmitted = false;
  loginErrorMessage = '';

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'გთხოვთ, შეიყვანოთ იმეილი' });
    email(schemaPath.email, { message: 'გთხოვთ, შეიყვანოთ სწორი იმეილი' });

    required(schemaPath.password, { message: 'გთხოვთ, შეიყვანოთ პაროლი' });
    minLength(schemaPath.password, 6, {
      message: 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს',
    });
  });

  isFormValid = computed(() => this.loginForm().valid());

  authService = inject(AuthService);
  router = inject(Router);
  showInfo = signal(false);

  constructor() {
    effect(() => {
      console.log(this.loginForm.email());
      console.log(this.loginForm.password().value());
      console.log(this.loginForm().value());
    });
  }

  onLogin() {
    this.formSubmitted = true;
    this.loginErrorMessage = '';

    if (!this.isFormValid()) {
      return;
    }

    console.log('login');
    console.log(this.loginForm.email());
    console.log(this.loginForm.password());

    this.authService.login(this.loginForm().value()).subscribe({
      next: (res) => this.authService.navigateToCorrectProfile(),
      error: (err) => {
        if (err.status === 400 || err.status === 401) {
          this.loginErrorMessage = 'იმეილი ან პაროლი არასწორია';
          return;
        }

        this.loginErrorMessage = 'დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან';
      },
    });
  }

  onRegiter() {
    this.router.navigate(['/registration'], {
      queryParams: { role: 'volunteer' },
    });
  }

  openInfo() {
    this.showInfo.set(true);
  }

  closeInfo() {
    this.showInfo.set(false);
  }
}
