import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authService.service';
import {AuthService as SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AvailablePoints} from '../shared/available-points.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loggedIn: boolean;
  private availPointsSub: Subscription;
  availPoints: AvailablePoints;

  constructor(private authService: AuthService,
              private socialAuthService: SocialAuthService,
              private router: Router) { }

  ngOnInit() {
    this.availPoints = new AvailablePoints();
    this.availPointsSub = this.authService.availPointsChanged.subscribe(
      (availPoints: AvailablePoints) => {
        this.availPoints = availPoints;
      }
    );
  }

  ngOnDestroy() {
    this.availPointsSub.unsubscribe();
  }

  checkLoggedIn() {
    this.loggedIn = this.authService.getLoggedIn();
    return this.loggedIn;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  signInWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        console.log('Google login success.');
        this.authService.login(user.idToken);
      }
    );
  }

  signOutSocial() {
    this.socialAuthService.signOut();
  }

  getPicture() {
    return this.authService.getUserPicture();
  }

}
