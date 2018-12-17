import {Component, OnDestroy, OnInit} from '@angular/core';
import {TripsService} from './trips.service';
import {Subscription} from 'rxjs';
import {Trip} from './trip.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AddTripComponent} from './add-trip/add-trip.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookableRoom} from '../room-management/bookable-room.model';

@Component({
  selector: 'app-trip-management',
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.css']
})
export class TripManagementComponent implements OnInit, OnDestroy {
  private tripsSubscription: Subscription;
  public trips: Trip[];
  isLoading = true;

  constructor(private tripsService: TripsService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.spinner.show();
    this.tripsService.getTrips();
    this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
      (trips: Trip[]) => {
        this.trips = trips;
        this.spinner.hide();
        this.isLoading = false;
      },
      (error: string) => {
        console.log(error);
        this.spinner.hide();
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.tripsSubscription.unsubscribe();
  }

  onAddNewTrip() {
    const modalRef = this.modalService.open(AddTripComponent);
    modalRef.result.then(
      (modalResult) => {
        const value = modalResult.value;
        console.log(value);
      }
    );
  }

  onTripDelete(tripId: number) {
    this.tripsService.removeTrip(tripId);
  }
}
