import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../gobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from '../authService.service';

@Injectable()
export class PointsService {
  availablePointsChanged = new Subject<number>();
  bankPointsComplete = new Subject<Object>();
  constructor(private http: HttpClient, private globals: Globals, private authService: AuthService, private snackBar: MatSnackBar) {
  }


  getAvailablePoints(bankDate: Date) {
    const epoch = bankDate.getTime() / 1000;

    this.http.get(this.globals.dvcApiServer + '/api/bank_points/' + epoch).subscribe(
      (points: object) => {
        this.availablePointsChanged.next(points['available_bank_count']);
      }
    );
  }

  bankPoints(bankDate: Date, pointsCount: number) {
    const epoch = bankDate.getTime() / 1000;

    const body = {
      'epoch_bank_date' : epoch,
      'count_to_bank' : pointsCount
    };

    this.http.post(this.globals.dvcApiServer + '/api/bank_points/', body,
      {observe: 'response'}).subscribe(
      (result) => {
        if (result.status === 201) {
            const resp = {
              'status' : 201
            };
           this.bankPointsComplete.next(resp);
           this.snackBar.open('Points banking complete', 'X',
            {duration: 5000, verticalPosition: 'top'});
           this.authService.queryPointsCount();
        }
      },
      (error: string) => {
        console.log(error);
        this.snackBar.open('An Error occurred during points banking', 'X',
            {verticalPosition: 'top', panelClass: ['error-snackbar']});
      }
    );
  }

}
