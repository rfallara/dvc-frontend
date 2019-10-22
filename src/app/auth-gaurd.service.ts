import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './authService.service';

@Injectable()
export class AuthGaurdService implements CanActivate {
  constructor (private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.getLoggedIn();

    if (this.authService.getLoggedIn() ) {
      if (route.data['access_level']) {
        if (+localStorage.getItem('access_level') >= route.data['access_level']) {
          return true;
        }
      } else {
        return true;
      }
    }

    return false;

  }
}
