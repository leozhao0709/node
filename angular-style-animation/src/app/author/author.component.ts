import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [`
    h1 {
      margin: 0;
      font-size: 12px;
    }
  `]
})
export class AuthorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
