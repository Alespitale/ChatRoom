import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.UserService.logout()
      .then( res => {
        console.log(res);
        this.router.navigate(['/login']);
      })
      .catch(error => { console.log(error)});
  }
}
