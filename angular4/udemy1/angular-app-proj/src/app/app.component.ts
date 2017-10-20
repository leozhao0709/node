import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBqkioYh2ISV3XRQlV-CgP3brGPR6fEycc',
      authDomain: 'ng-recipe-book-8e62b.firebaseapp.com',
    });
  }

}
