import { Router } from '@angular/router';
import { UserService } from './../../services/user.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
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

  signUp() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validEmail)) {
      this.UserService.register({ email, password })
        .then((res) => {
          console.log(res);
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return this.error();
    }
  }

  error() {
    this._snackbar.open('Email o contraseña incorrectos', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
