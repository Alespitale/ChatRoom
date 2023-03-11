import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { Router } from '@angular/router';
import {
  multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,
  RecaptchaVerifier
} from "firebase/auth";


@Component({
  selector: 'app-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.css'],
})
export class SmsValidationComponent implements OnInit {
  constructor(private UserService: UserService, private router: Router) {}

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
