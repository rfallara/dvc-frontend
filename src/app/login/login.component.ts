import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authService.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  checkLoggedIn() {
    return this.authService.getLoggedIn();
  }


  onLogin(form: NgForm) {
    const value = form.value;
    const username = value.username;
    const password = value.password;
    const x = this.authService.login(username, password);
    console.log(x);
  }

  onLogout() {
    this.authService.logout();
  }

}
