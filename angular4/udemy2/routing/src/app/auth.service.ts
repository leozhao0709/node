import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  loggedIn = false;

  constructor() { }

  isAuthenticated() {
    return new Promise(
      (res, rej) => {
        setTimeout(() => {
          res(this.loggedIn);
        }, 800);
      }
    );
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

}
