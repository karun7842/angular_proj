import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  username: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'] || '';
    });
  }

  goToAddPatient() {
    this.router.navigate(['/add-patient']);
  }
}
