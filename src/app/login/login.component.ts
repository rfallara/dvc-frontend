import {Component, OnInit} from '@angular/core';
import {AuthService} from '../authService.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
