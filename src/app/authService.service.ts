import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Globals} from './gobals';
import {AuthService as SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AvailablePoints} from './shared/available-points.model';

@Injectable()
export class AuthService {
  availPointsChanged = new Subject();
  private availablePoints: AvailablePoints;
  private currentUserOwnerName: string;
  private currentUserEmail: string;
  private currentUserPicture: string;

  constructor (private http: HttpClient,
               private globals: Globals,
               private socialAuthService: SocialAuthService,
               private router: Router) {

    this.availablePoints = new AvailablePoints();
    if (localStorage.getItem('access_token')) {
      this.currentUserOwnerName = localStorage.getItem('owner_name');
      this.currentUserEmail = localStorage.getItem('user_email');
      this.currentUserPicture = localStorage.getItem('user_picture');
    }
  }

  login (googleIdToken: string) {
    return this.http.post(this.globals.dvcApiServer + '/api/token/',
      { 'google_id_token' : googleIdToken} ).subscribe(
      (response) => {
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

  getOwnerName() {
    return this.currentUserOwnerName;
  }

  getUserPicture() {
    return this.currentUserPicture;
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
      localStorage.setItem('owner_name', authResult.owner);
      localStorage.setItem('user_email', authResult.email);
      localStorage.setItem('user_picture', authResult.picture);
      this.currentUserOwnerName = authResult.owner;
      this.currentUserEmail = authResult.email;
      this.currentUserPicture = authResult.picture;
      this.queryPointsCount();
    } else {
      this.logout();
    }
  }


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_exp');
    localStorage.removeItem('owner_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_picture');
  }

}
