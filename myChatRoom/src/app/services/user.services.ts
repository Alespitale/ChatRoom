import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
} from '@angular/fire/auth';
import {Firestore} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(
    private auth: Auth

  ) {}

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  phoneLogin({ phoneNumber, appVerifier }: any) {
    return signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }
}
