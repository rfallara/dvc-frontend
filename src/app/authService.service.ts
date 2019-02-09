import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Globals} from './gobals';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private actualPoints = {
    'banked': '',
    'current': '',
    'borrow': ''
  };

  constructor (private http: HttpClient, private globals: Globals, private router: Router) {
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

  getLoggedIn() {
   if (localStorage.getItem('access_token')) {
     const expire_time = localStorage.getItem('access_token_exp');
     if (+expire_time < Math.floor( Date.now() / 1000)) {
       this.logout();
       this.router.navigate(['/']);
       return false;
     }
     return true;
   } else {
     return false;
   }
  }

  queryPointsCount(ownerId: number) {
      this.http.get(this.globals.dvcApiServer + '/api/points_count/' + ownerId).subscribe(
        (response) => {
          this.actualPoints = response['actual_points'];
          console.log(this.actualPoints);
        }
      );
  }

  private setSession(authResult) {
    if (authResult.status === 'success') {
      localStorage.setItem('access_token', authResult.access_token);
      localStorage.setItem('access_token_exp', authResult.exp);
      this.queryPointsCount(2);
    } else {
      this.logout();
    }
  }

  getActualPoints() {
    return this.actualPoints;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}
