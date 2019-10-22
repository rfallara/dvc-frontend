import {RouterModule, Routes} from '@angular/router';
import {RoomManagementComponent} from './room-management/room-management.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthGaurdService} from './auth-gaurd.service';
import {TripManagementComponent} from './trip-management/trip-management.component';
import {PointManagementComponent} from './point-management/point-management.component';
import {AddTripComponent} from './trip-management/add-trip/add-trip.component';
import {EventLoggingComponent} from './event-logging/event-logging.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'trips', component: TripManagementComponent, canActivate: [AuthGaurdService]},
  {path: 'rooms', component: RoomManagementComponent, canActivate: [AuthGaurdService]},
  {path: 'points', component: PointManagementComponent, canActivate: [AuthGaurdService]},
  {path: 'add-trip', component: AddTripComponent, canActivate: [AuthGaurdService]},
  {path: 'events', component: EventLoggingComponent, canActivate: [AuthGaurdService], data: { access_level: 7 } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGaurdService]
})

export class AppRoutingModule {
}
