import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../gobals';
import {EventLog, EventsPager} from './event.model';
import {Subject} from 'rxjs';

@Injectable()
export class EventsService {
  eventLogChanged = new Subject<EventsPager>();

  constructor(private http: HttpClient, private globals: Globals) {

  }


  getEvents(page: number, perPage: number) {
    this.http.get(this.globals.dvcApiServer + '/api/events/?page=' + page + '&per_page=' + perPage).subscribe(
      (eventsPager: EventsPager) => {
          this.eventLogChanged.next(eventsPager);
      }
    );
  }

}


