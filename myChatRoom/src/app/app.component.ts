import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myChatRoom';
  constructor(public auth: AuthService, private router: Router) {}

  signOut() {
    this.auth.signOut().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}
