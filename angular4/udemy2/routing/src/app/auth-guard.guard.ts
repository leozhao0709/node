import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardGuard implements CanActivate, CanActivateChild {
  constructor(private _authService: AuthService, private _router: Router, ) { };

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this._authService.isAuthenticated().then((auth: boolean) => {
      if (auth) {
        return true;
      } else {
        this._router.navigate(['/']);
      }
    })
      ;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.isAuthenticated().then((auth: boolean) => {
      if (auth) {
        return true;
      } else {
        this._router.navigate(['/']);
      }
    })
      ;
  }
}
