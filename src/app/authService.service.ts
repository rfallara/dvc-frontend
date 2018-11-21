import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  constructor (private http: HttpClient) {
  }

  login (username: String, password: String) {
    // return this.http.post('http://localhost:5000/api/token/',
    return this.http.post('https://dvc-restful.appspot.com/api/token/',
      { 'username' : username, 'password': password} ).subscribe(
      (response) => {
        console.log(response);
        this.setSession(response);
      }
    );
  }

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
