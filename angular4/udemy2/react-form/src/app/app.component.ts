import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  hobbiesArray: FormArray = new FormArray([]);
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': this.hobbiesArray,
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.signupForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });

    this.signupForm.setValue({
      'userData': {
        'username': 'xxx',
        'email': 'xxxx@xxxxx.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'gender': 'female'
    });

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbiesArray.push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(controls: FormControl): Promise<{ [s: string]: boolean }> | Observable<{ [s: string]: boolean }> {
    return new Promise<{ [s: string]: boolean }>((res, rej) => {
      setTimeout(() => {
        if (controls.value === 'test@gmail.com') {
          return res({ 'emailIsForbidden': true });
        } else {
          return res(null);
        }
      }, 1500);
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
}
