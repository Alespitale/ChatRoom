import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.services';

import { Auth, RecaptchaVerifier } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.css'],
  providers: [UserService, WindowService],
})
export class SmsValidationComponent implements OnInit {
  country = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{1,2}'),
  ]);
  area = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{3}'),
  ]);
  prefix = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{3}'),
  ]);
  line = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{4}'),
  ]);
  verificationCode = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{6}'),
  ]);

  windowRef: any;
  phoneNumber: any;
  user: any;

  constructor(
    private win: WindowService,
    private userSvc: UserService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
      },
      this.auth
    );
    this.windowRef.recaptchaVerifier.render();
  }

  e164(country: any, area: any, prefix: any, line: any) {
    const num = country + area + prefix + line;
    return `+${num}`;
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.e164(
      this.country.value,
      this.area.value,
      this.prefix.value,
      this.line.value
    );

    this.userSvc
      .phoneLogin({ phoneNumber: num, appVerifier })
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode.value)
      .then((res: any) => {
        this.user = res.user;
        this.router.navigate(['/chat']);
      })
      .catch((err: any) => console.log(err, 'Incorrect code entered?'));
  }
}
