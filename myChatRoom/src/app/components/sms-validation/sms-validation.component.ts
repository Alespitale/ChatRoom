import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { Router } from '@angular/router';
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from 'firebase/auth';

@Component({
  selector: 'app-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.css'],
})
export class SmsValidationComponent implements OnInit {
  
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/^(?:(?:00)?\+549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/)]);

  constructor(
    private UserService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {}

  logOut() {
    this.UserService.logout()
      .then((res) => {
        console.log(res);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  validateSMS() {
    // const phoneNumber = '+573003000000';
    // const appVerifier = new RecaptchaVerifier('recaptcha-container');
    // PhoneAuthProvider.verifyPhoneNumber(this.UserService.auth, phoneNumber, appVerifier)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     const code = window.prompt('Please enter the verification code that was sent to your mobile device.');
    //     confirmationResult.confirm(code).then((result) => {
    //       // User signed in successfully.
    //       const user = result.user;
    //       // ...
    //     }).catch((error) => {
    //       // User couldn't sign in (bad verification code?)
    //       // ...
    //     });
    //   }).catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    //   });
    console.log('validateSMS');
  }

  //   const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);
  // multiFactor(user).getSession()
  //     .then(function (multiFactorSession) {
  //         // Specify the phone number and pass the MFA session.
  //         const phoneInfoOptions = {
  //             phoneNumber: phoneNumber,
  //             session: multiFactorSession
  //         };

  //         const phoneAuthProvider = new PhoneAuthProvider(auth);

  //         // Send SMS verification code.
  //         return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
  //     }).then(function (verificationId) {
  //         // Ask user for the verification code. Then:
  //         const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
  //         const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

  //         // Complete enrollment.
  //         return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
  //     });
}
