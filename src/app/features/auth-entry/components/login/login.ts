import { Component, effect, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField } from '@angular/forms/signals';
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

  loginForm = form(this.loginModel);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    effect(() => {
      console.log(this.loginForm.email());
      console.log(this.loginForm.password().value());
      console.log(this.loginForm().value());
    });
  }

  onLogin() {
    console.log('login');
    console.log(this.loginForm.email());
    console.log(this.loginForm.password());
    this.authService.login(this.loginForm().value()).subscribe({
      next: () =>{},
        
      error: (e) => console.error(e), // ვაჩვენოთ ერორი
    });
  }

  onRegiter() {
    this.router.navigateByUrl('registration');
  }
}
