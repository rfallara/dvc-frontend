import {Resort} from './resort.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RoomsService {
  private resorts: Resort[];
  resortsChanged = new Subject<Resort[]>();


  // private resorts: Resort[] = [
  //   new Resort('Animal Kingdom'),
    // new Resort('Bay Lake Tower')
  // ];

  constructor(private http: HttpClient) {
  }


  getResorts() {
    this.http.get('http://localhost:5000/api/resorts/').subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
        this.resortsChanged.next(this.resorts.slice());
      }
    );
    return this.resorts.slice(); // return a copy
  }

}
