import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private AuthService: AuthService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
}

  onSignUp() {
    this.AuthService.register(this.form.value).subscribe({
      next: () => { this.router.navigate(['/sms-validation']); },
      error: (err) => {
        this._snackbar.open(err.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  onError() {
    this._snackbar.open('Incorrect email format', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
