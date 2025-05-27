import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home/:username', component: HomepageComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: '**', redirectTo: '' }
];
