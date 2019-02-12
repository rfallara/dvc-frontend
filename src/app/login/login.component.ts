import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authService.service';
import {NgForm} from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.availPoints = new AvailablePoints();
    this.availPointsSub = this.authService.availPointsChanged.subscribe(
      (availPoints: AvailablePoints) => {
        this.availPoints = availPoints;
        console.log(this.availPoints);
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

  onLogin(form: NgForm) {
    const value = form.value;
    const username = value.username;
    const password = value.password;
    this.authService.login(username, password);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
