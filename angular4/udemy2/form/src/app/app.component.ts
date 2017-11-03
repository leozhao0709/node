import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'teacher';
  questionAnswer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    mail: '',
    scretQuestion: '',
    anwser: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signupForm.form.patchValue({
      userdata: {
        username: suggestedName
      }
    })
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userdata.username;
    this.user.mail = this.signupForm.value.userdata.email;
    this.user.scretQuestion = this.signupForm.value.secret;
    this.user.anwser = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
