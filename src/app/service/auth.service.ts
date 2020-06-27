import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  bLoggedIn = false;

  constructor(private fbAuth: AngularFireAuth ) {
    this.fbAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.bLoggedIn = true;
      } else {
        this.bLoggedIn = false;
      }
    });
  }

  login(email: string, password: string) {
    return this.fbAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.bLoggedIn = true;
    });
  }

  logout() {
    return this.fbAuth.auth.signOut();
  }

  isLoggedIn() {
    return this.bLoggedIn;

  }
}
