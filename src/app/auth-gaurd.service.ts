import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './authService.service';

@Injectable()
export class AuthGaurdService implements CanActivate {
  constructor (private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.getLoggedIn();
  }
}
