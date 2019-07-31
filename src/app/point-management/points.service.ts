import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Globals} from '../gobals';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class PointsService {
  availablePointsChanged = new Subject<number>();
  bankPointsComplete = new Subject<Object>();
  constructor(private http: HttpClient, private globals: Globals, private snackBar: MatSnackBar) {
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
