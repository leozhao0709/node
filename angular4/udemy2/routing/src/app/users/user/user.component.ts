import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      this.user = {
        id: +this._activeRoute.snapshot.params['id'],
        name: this._activeRoute.snapshot.params['name']
      };
    });
  }

}
