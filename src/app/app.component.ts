import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html', // this points to the HTML file above
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'proj';

 isDarkMode = false;

ngOnInit(): void {
  this.isDarkMode = document.body.classList.contains('dark');
}

toggleTheme(): void {
  console.log(this.isDarkMode);
  
  this.isDarkMode = !this.isDarkMode;
  if (this.isDarkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
}
