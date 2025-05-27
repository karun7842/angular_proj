import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private users: any[] = [];  // keep users in memory

  constructor(private http: HttpClient) {}

  loadUsersFromJSON(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get('assets/users.json').subscribe(
        (data: any) => {
          this.users = data.users;
          resolve();
        },
        (error) => {
          console.error('Failed to load users JSON', error);
          reject();
        }
      );
    });
  }

  getUsers() {
    return this.users;
  }

  // Initialize localStorage with users if not present (only once)
  initializeLocalStorage() {
    const usersInStorage = localStorage.getItem('users');
    if (!usersInStorage) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
