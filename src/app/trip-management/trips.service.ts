import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../gobals';
import {Trip} from './trip.model';
import {Observable, Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookableRoom} from '../room-management/bookable-room.model';
import {Owner} from '../shared/owner.model';
import {forEach} from '@angular/router/src/utils/collection';


@Injectable()
export class TripsService {
  private trips: Trip[];
  tripsChanged = new Subject<Trip[]>();
  private bookableRooms: BookableRoom[];
  bookableRoomsChanged = new Subject<BookableRoom[]>();
  private owners: Owner[];
  ownersChanged = new Subject<Owner[]>();


  constructor(private http: HttpClient, private globals: Globals, private modalService: NgbModal) {
  }

  getTrips() {
    this.http.get(this.globals.dvcApiServer + '/api/trips/').subscribe(
      (trips: Trip[]) => {
        this.trips = trips;
        this.tripsChanged.next(this.trips.slice());
        console.log(trips);
      },
      (error: string) => {
        console.log(error);
      }
    );
  }

  addTrip(newTrip) {
    return this.http.post(this.globals.dvcApiServer + '/api/trips/', newTrip).subscribe(
      (createdTrip: Trip) => {
        // console.log(createdTrip);
        this.trips.push(createdTrip);
        this.tripsChanged.next(this.trips.slice());
      },
      (error: string) => {
        console.log(error);
      }
    );
  }

  removeTrip(tripId: number) {
    this.http.delete(this.globals.dvcApiServer + '/api/trips/' + tripId).subscribe(
      () => {
        this.trips.forEach((trip: Trip, index) => {
          if (trip.id === tripId) {
            this.trips.splice(index, 1);
          }
        });
        this.tripsChanged.next(this.trips.slice());
      }
    );
  }

  getBookableRooms() {
    this.http.get(this.globals.dvcApiServer + '/api/bookable_rooms/').subscribe(
      (bookableRooms: BookableRoom[]) => {
        this.bookableRooms = bookableRooms;
        this.bookableRoomsChanged.next(this.bookableRooms.slice());
      },

      (error: string) => {
        console.log(error);
      }
    );
  }

  getOwners() {
    this.http.get(this.globals.dvcApiServer + '/api/owners/').subscribe(
      (owners: Owner[]) => {
        this.owners = owners;
        this.ownersChanged.next(this.owners.slice());
      },

      (error: string) => {
        console.log(error);
      }
    );
  }

}
