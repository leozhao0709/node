import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  hobbiesArray: FormArray = new FormArray([]);

  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        // tslint:disable-next-line:max-line-length
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this) /*this is important, note to bind to this */]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': this.hobbiesArray
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.signupForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //   }
    // );

    this.signupForm.setValue({
      'userData': {
        'username': 'lzhao',
        'email': 'lzhao@shutterfly.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'll',
        'email': 'lzhao@shutterfly.com'
      }
    });

  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'gender': 'male'
    });
  }

  onAddHobby() {
    const control: FormControl = new FormControl(null, Validators.required);
    // (<FormArray>this.signupForm.get('hobbies')).push(control);
    this.hobbiesArray.push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise: Promise<any> = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
