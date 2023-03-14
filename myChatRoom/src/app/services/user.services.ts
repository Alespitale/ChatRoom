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
} from '@angular/fire/auth';
import {Firestore} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(
    private auth: Auth
  ) {}

  async register({ email, password }: any): Promise<any>{
    try{
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }: any): Promise<any>{
    try{
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.log(error);
    }
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

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}
