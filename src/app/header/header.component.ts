import {Component, OnInit} from '@angular/core';
import {AuthService} from '../authService.service';
import {AuthService as SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import {Globals} from '../gobals';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;
  isDevelopment = false;

  constructor(private authService: AuthService,
              private socialAuthService: SocialAuthService,
              private globals: Globals,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    if (this.authService.getLoggedIn()) {
      this.authService.queryPointsCount();
    }

    if (this.globals.dvcApiServer.indexOf('dvc-dev') > -1 || this.globals.dvcApiServer.indexOf('127.0.0.1') > -1 ) {
      this.isDevelopment = true;
    } else {
      this.isDevelopment = false;
    }

  }

  checkLoggedIn() {
    return this.authService.getLoggedIn();
  }

  accessLevel(minAccessLevel: Number) {
    if (+localStorage.getItem('access_level') >= minAccessLevel) {
      return true;
    } else {
      return false;
    }
  }

  signInWithGoogle() {
    console.log('Calling Google Sign In');
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.spinner.show();
        const loginSubject = this.authService.login(user.idToken).subscribe(
          () => {this.spinner.hide(); },
          () => {this.spinner.hide(); },
          () => { loginSubject.unsubscribe(); }
        );
      },
      (error) => {
        console.log('Error occurred' + error);
      }
    ).catch(
      (error) => {
        console.log('Catch Error ' + error);
      }
    );
  }

  signOutSocial(loggedOut: boolean) {
    this.isCollapsed = loggedOut;
    this.socialAuthService.signOut();
  }
}
