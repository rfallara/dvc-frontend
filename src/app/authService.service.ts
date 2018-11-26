import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Globals} from './gobals';

@Injectable()
export class AuthService {

  constructor (private http: HttpClient, private globals: Globals) {
  }

  login (username: String, password: String) {
    return this.http.post(this.globals.dvcApiServer + '/api/token/',
      { 'username' : username, 'password': password} ).subscribe(
      (response) => {
        // console.log(response);
        this.setSession(response);
      }
    );
  }
  // TODO Check is auth token is expired
  getLoggedIn() {
   if (localStorage.getItem('access_token')) {
     return true;
   } else {
     return false;
   }
  }

  private setSession(authResult) {
    if (authResult.status === 'success') {
      localStorage.setItem('access_token', authResult.access_token);
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}
