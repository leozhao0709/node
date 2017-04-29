import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  token: string;

  constructor(private _router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
      (error: Error) => {
        console.log(error);
      }
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      (response) => {
        // console.log(response);
        this._router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then((token: string) => this.token = token);
      }
      )
      .catch((error) => {
        console.log(error);
      })
      ;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then((token: string) => this.token = token);
    return this.token;
  }

  isAuthenTicated() {
    return this.token != null;
  }

}
