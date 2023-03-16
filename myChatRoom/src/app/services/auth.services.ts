import { SignupCredentials } from './../models/auth.model';
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
  sendPasswordResetEmail,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.auth);

  constructor(
    private auth: Auth
  ) {}

  register({ email, password, displayName }: SignupCredentials) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe( 
      switchMap(({user}) => updateProfile(user, { displayName }))
    );
  }

  login({ email, password }: SignupCredentials){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  async phoneLogin({ phoneNumber, appVerifier }: any): Promise<any>{
    try{
      return await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithGoogle(): Promise<any>{
    try{
      return await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return await sendPasswordResetEmail(this.auth, email);
    }
    catch (error) {
      console.log(error);
    }
  }

  getLoggedUser(){
    return authState(this.auth);
  }

  signOut(){
    return from(this.auth.signOut());
  }
}
