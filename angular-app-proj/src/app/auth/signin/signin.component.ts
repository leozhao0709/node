import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup = new FormGroup(
    {
      'email': new FormControl(null),
      'password': new FormControl(null)
    }
  );

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  /**
   * onSignin
   */
  public onSignin() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this._authService.signinUser(email, password);
  }
}
