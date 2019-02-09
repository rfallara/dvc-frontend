import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getLoggedIn()) {
      this.authService.queryPointsCount(2);
    }
  }

  checkLoggedIn() {
    return this.authService.getLoggedIn();
  }
}
