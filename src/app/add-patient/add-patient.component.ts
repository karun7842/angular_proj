import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  constructor(private router: Router) {}

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  patient: {
    name: string;
    age: number | string;
    symptoms: string;
    treatment: string;
    bloodType: string;
    status: boolean;
    // scans: string[];      
    condition: string;
    isEmergency: boolean;
  } = {
    name: '',
    age: '',
    symptoms: '',
    treatment: '',
    bloodType: 'A+',
    status: false,
    // scans: [],
    condition: '',
    isEmergency: false
  };

  // handleScanUpload(event: any) {
  //   const files = event.target.files;
  //   this.patient.scans = [];
  //   for (let i = 0; i < files.length; i++) {
  //     this.patient.scans.push(files[i].name); // only storing names
  //   }
  // }

  savePatient(form:NgForm) {
    const storedDoctorStr = sessionStorage.getItem('currentDoctor');
    if (!storedDoctorStr) {
      alert('Session expired. Please log in again.');
      return;
    }
  
    const storedDoctor = JSON.parse(storedDoctorStr);
  
    // Add patient to current doctor in session
    storedDoctor.patients = [...(storedDoctor.patients || []), this.patient];
  
    // Update sessionStorage
    sessionStorage.setItem('currentDoctor', JSON.stringify(storedDoctor));
  
    // Update users array in localStorage
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
      alert('Users data not found.');
      return;
    }
  
    const users = JSON.parse(usersStr);
    const userIndex = users.findIndex((user: any)=> user.username === storedDoctor.username);
  
    if (userIndex !== -1) {
      users[userIndex] = storedDoctor;
    } else {
      users.push(storedDoctor);
    }
  
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Patient saved successfully!');
    
    // Optionally reset form and patient object here
  
  
    this.patient = {
      name: '',
      age: '',
      symptoms: '',
      treatment: '',
      bloodType: '',
      status: false,
      condition: '',
      isEmergency: false
    };
    form.resetForm(this.patient);
  }

  goBack() {
    this.router.navigate(['/doctor-dashboard']);
  }
  
}