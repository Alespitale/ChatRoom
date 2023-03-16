import { FormControl } from '@angular/forms';
import { filter, Observable, map, distinctUntilChanged, switchMap} from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.services';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  userLogged = this.AuthService.getLoggedUser();
  userId: any = {};
  newMsg= new FormControl;
  chatMessages: any[] = [];
  constructor(
    private AuthService: AuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.AuthService.getLoggedUser().subscribe(user => {
      this.userId = user;
    })
  }

  // public async onSendMsg(roomId:string, member: User): Promise<void> {
  //   if(this.newMsg.value.trim().length === 0) return;
  //   this.newMsg.disable();

    // await this.messageService.sendMessage(roomId, {
    //   message: this.newMsg.value,
    //   dateCreated: new Date().getTime(),
    //   user: {
    //     displayName: member.displayName,
    //   }
    // } as Message);

    // this.newMsg.reset();
    // this.newMsg.enable();

    // setTimeout(() => {
    //   this.scrollToTheLastMsg();
    // }, 10);
  // }

  scrollToTheLastMsg() {
    let elem = document.getElementsByClassName('msg');
    let last: any = elem[elem.length - 1];
    let topPos = last.offsetTop;
    //@ts-ignore
    document.getElementById('block-msg').scrollTop = topPos;
  }

}
