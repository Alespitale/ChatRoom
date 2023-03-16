import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
  ]);

  constructor(
    private userSvc: AuthService,
    private router: Router,
    private _snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  async onResetPwd() {
    try {
      const userEmail = this.email.value!;
      await this.userSvc.resetPassword(userEmail)
        .then(() => {
          this.onEmailSent();
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  onEmailSent() {
    this._snackbar.open('Email sent, check your inbox or spam!', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}