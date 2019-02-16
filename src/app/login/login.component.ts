import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../authService.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AvailablePoints} from '../shared/available-points.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private availPointsSub: Subscription;
  availPoints: AvailablePoints;
  @Output() loggedOut = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
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

  onLogout() {
    this.authService.logout();
    this.loggedOut.emit(true);
    this.router.navigate(['/']);
  }

  getPicture() {
    return this.authService.getUserPicture();
  }

}
