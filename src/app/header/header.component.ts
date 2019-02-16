import {Component, OnInit} from '@angular/core';
import {AuthService} from '../authService.service';
import {AuthService as SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {
    if (this.authService.getLoggedIn()) {
      this.authService.queryPointsCount();
    }
  }

  checkLoggedIn() {
    return this.authService.getLoggedIn();
  }

  signInWithGoogle() {
    console.log('Calling Google Sign In');
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.authService.login(user.idToken);
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
