import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // ✅ Required!
import { UserDataService } from './user-data.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule  // ✅ Required for HttpClient to work in standalone component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proj';
  isDarkMode = false;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private userDataService: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      const theme = params['theme'];
      this.setDarkMode(theme === 'dark');
    });

    const usersInStorage = localStorage.getItem('users');
    if (!usersInStorage) {
      await this.userDataService.loadUsersFromJSON();
      this.userDataService.initializeLocalStorage();
    }

    this.isDarkMode = document.body.classList.contains('dark-theme');
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode);
  }

  private setDarkMode(enable: boolean): void {
    this.isDarkMode = enable;
    if (enable) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
