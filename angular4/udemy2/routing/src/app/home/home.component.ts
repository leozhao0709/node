import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService, ) { }

  ngOnInit() {
  }

  onLoadServer(id: number) {
    this._router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '0' }, fragment: 'loading' });
  }

  onLogIn() {
    this._authService.login();
  }

  onLogOut() {
    this._authService.logout();
  }
}
