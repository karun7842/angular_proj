import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctor: any = null;
  patients: any[] = [];
  searchTerm='';

  sortField: 'name' | 'age' | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedDoctorStr = sessionStorage.getItem('currentDoctor');
    if (!storedDoctorStr) {
      this.router.navigate(['/login']);
      return;
    }

    const loggedInDoctor = JSON.parse(storedDoctorStr);
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
      this.router.navigate(['']);
      return;
    }

    const users = JSON.parse(usersStr);
    const updatedDoctor = users.find((user: any) => user.username === loggedInDoctor.username);

    if (!updatedDoctor) {
      this.router.navigate(['']);
      return;
    }

    this.doctor = updatedDoctor;
    this.patients = updatedDoctor.patients || [];
    sessionStorage.setItem('currentDoctor', JSON.stringify(updatedDoctor));
  }

  addPatient() {
    this.router.navigate(['/add-patient']);
  }

  sortBy(field: 'name' | 'age') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  
    this.patients.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
  
      // Apply lowercase comparison only for 'name'
      if (field === 'name') {
        aValue = (aValue || '').toLowerCase();
        bValue = (bValue || '').toLowerCase();
      }
  
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get filteredPatients() {
    if (!this.searchTerm.trim()) {
      return this.patients;
    }
    const lowerSearch = this.searchTerm.toLowerCase();
    return this.patients.filter(patient =>
      patient.name.toLowerCase().includes(lowerSearch) ||
      String(patient.age).includes(lowerSearch) ||
      patient.symptoms.toLowerCase().includes(lowerSearch) ||
      patient.treatment.toLowerCase().includes(lowerSearch)
    );
  }
  logout() {
    sessionStorage.removeItem('currentDoctor'); // clear session
    this.router.navigate(['']);           // navigate to login page
  }
  
}
