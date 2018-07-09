import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    return true;
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== '';
  }

}
