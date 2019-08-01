import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../gobals';
import {Trip} from './trip.model';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookableRoom} from '../room-management/bookable-room.model';
import {Owner} from '../shared/owner.model';
import {Resort} from '../room-management/resort.model';
import {AuthService} from '../authService.service';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class TripsService {
  private trips: Trip[];
  tripsChanged = new Subject<Trip[]>();
  private bookableRooms: BookableRoom[];
  bookableRoomsChanged = new Subject<BookableRoom[]>();
  private resorts: Resort[];
  resortsChanged = new Subject<Resort[]>();
  private owners: Owner[];
  ownersChanged = new Subject<Owner[]>();


  constructor(private http: HttpClient, private globals: Globals, private modalService: NgbModal,
              private authService: AuthService, private snackBar: MatSnackBar) {
  }

  getTrips() {
    this.http.get(this.globals.dvcApiServer + '/api/trips/').subscribe(
      (trips: Trip[]) => {
        trips.forEach((thisTrip: Trip) => {
          thisTrip.booked_date = new Date(thisTrip.booked_date);
          thisTrip.check_in_date = new Date(thisTrip.check_in_date);
          thisTrip.check_out_date = new Date(thisTrip.check_out_date);
        });
        this.trips = trips;
        this.tripsChanged.next(this.trips.slice());
      },
      (error: string) => {
        console.log(error);
      }
    );
  }

  addTrip(newTrip) {
    return this.http.post(this.globals.dvcApiServer + '/api/trips/', newTrip).subscribe(
      (createdTrip: Trip) => {
        createdTrip.booked_date = new Date(createdTrip.booked_date);
        createdTrip.check_in_date = new Date(createdTrip.check_in_date);
        createdTrip.check_out_date = new Date(createdTrip.check_out_date);
        // console.log(createdTrip);
        this.trips.push(createdTrip);
        this.tripsChanged.next(this.trips.slice());
        console.log('Trip added');
        this.snackBar.open('Trip created successfully', 'X',
            {duration: 5000, verticalPosition: 'top'});
        // Update header points count
        this.authService.queryPointsCount();
      },
      (error: string) => {
        console.log(error);
        this.snackBar.open('An Error occurred during trip creation', 'X',
            {verticalPosition: 'top', panelClass: ['error-snackbar']});
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
        console.log('Trip deleted');
        // Update header points count
        this.authService.queryPointsCount();
      },
      (error: string) => {
        console.log(error);
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

  getResorts() {
    this.http.get(this.globals.dvcApiServer + '/api/resorts/').subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
        this.resortsChanged.next(this.resorts.slice());
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
