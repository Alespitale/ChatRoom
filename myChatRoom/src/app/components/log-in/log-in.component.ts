import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private UserService: UserService,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSignIn() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validEmail)) {
      this.UserService.login({ email, password })
        .then((res) => {
          console.log(res);
          this.router.navigate(['/sms-validation']);
        })
        .catch((error) => {
          this.onError();
        });
    } else {
      return this.onError();
    }
  }

  onError() {
    this._snackbar.open('Email o contraseña incorrectos', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onGoogleLogin() {
    this.UserService.loginWithGoogle()
      .then((res) => {
        console.log(res);
        this.router.navigate(['/sms-validation']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
