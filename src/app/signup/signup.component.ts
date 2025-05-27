import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  showPassword = false; // 👁️

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
      ]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const newUser = this.signupForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) =>
      u.username === newUser.username || u.email === newUser.email);

    if (exists) {
      this.errorMessage = 'Username or email already exists.';
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.successMessage = 'Registration successful! You can now login.';
    this.errorMessage = '';
    this.signupForm.reset();

    setTimeout(() => this.router.navigate(['/']), 2000);
  }
}
