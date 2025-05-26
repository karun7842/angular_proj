import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message = '';
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      this.successMessage = '';
      return;
    }

    const email = this.forgotForm.value.email;
    const storedUsers = localStorage.getItem('users');
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = users.find(user => user.email === email);

    if (foundUser) {
      this.successMessage = `A password reset link has been sent to ${email}.`;
      this.errorMessage = '';
      console.log('Reset link sent to:', email);
    } else {
      this.errorMessage = 'Email not found. Please check or register.';
      this.successMessage = '';
    }

    this.forgotForm.reset();
  }
}
