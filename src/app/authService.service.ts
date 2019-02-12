import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Globals} from './gobals';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AvailablePoints} from './shared/available-points.model';

@Injectable()
export class AuthService {
  availPointsChanged = new Subject();
  private availablePoints: AvailablePoints;

  private currentUserEmail = 'john@fallara.net'; // TODO Change to use actual user from Google auth login

  constructor (private http: HttpClient, private globals: Globals, private router: Router) {
    this.availablePoints = new AvailablePoints();
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

  queryPointsCount() {
      this.http.get(this.globals.dvcApiServer + '/api/points_count/' + this.currentUserEmail).subscribe(
        (response) => {
          this.availablePoints.actualPointsBanked = response['actual_points']['banked'];
          this.availablePoints.actualPointsCurrent = response['actual_points']['current'];
          this.availablePoints.actualPointsBorrow = response['actual_points']['borrow'];
          this.availablePoints.personalPointsBanked = response['personal_points']['banked'];
          this.availablePoints.personalPointsCurrent = response['personal_points']['current'];
          this.availablePoints.personalPointsBorrow = response['personal_points']['borrow'];
          this.availPointsChanged.next(this.availablePoints);
        }
      );
  }

  private setSession(authResult) {
    if (authResult.status === 'success') {
      localStorage.setItem('access_token', authResult.access_token);
      localStorage.setItem('access_token_exp', authResult.exp);
      this.queryPointsCount();
    } else {
      this.logout();
    }
  }


  logout() {
    localStorage.removeItem('access_token');
  }

}
