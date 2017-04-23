import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
  }

  /**
   * onLoadServers
   */
  public onLoadServers(id: number) {
    this._router.navigate(['servers', id, 'edit'], { relativeTo: this._activeRoute, queryParams: { allowEdit: 1 }, fragment: 'loading' });
  }

  /**
   * onLogin
   */
  public onLogin() {
    this._authService.login();
  }

  /**
   * onLogout
   */
  public onLogout() {
    this._authService.logout();
  }

}
