import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup(
    {
      'email': new FormControl(null),
      'password': new FormControl(null)
    }
  );

  constructor(private _authService: AuthService) { }

  ngOnInit() {

  }


  /**
   * onSignup
   */
  public onSignup() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this._authService.signupUser(email, password);
  }
}
