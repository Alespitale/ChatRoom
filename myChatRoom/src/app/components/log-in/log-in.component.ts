import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private AuthService: AuthService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  onSignIn() {
    const email = this.form.get('email')?.value;
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validEmail)) {
      this.AuthService.login(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/sms-validation']);
        },
        error: (err) => {
          this._snackbar.open(err.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
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
    this.AuthService.loginWithGoogle()
      .then((res) => {
        console.log(res);
        this.router.navigate(['/sms-validation']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
