import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RoomsService} from './room-management/rooms.service';
import { PointsService} from './point-management/points.service';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ResortComponent } from './room-management/resort/resort.component';
import { RoomTypeComponent } from './room-management/room-type/room-type.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { AuthService } from './authService.service';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptor } from './auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TripManagementComponent } from './trip-management/trip-management.component';
import { PointManagementComponent } from './point-management/point-management.component';
import { Globals } from './gobals';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, LoginOpt} from 'angularx-social-login';
import { TripsService } from './trip-management/trips.service';
import { AddTripComponent } from './trip-management/add-trip/add-trip.component';
import { DeleteTripComponent } from './trip-management/delete-trip/delete-trip.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {OwnersService} from './shared/owners.service';
import { EventLoggingComponent } from './event-logging/event-logging.component';
import {EventsService} from './event-logging/events.service';
import { EditNotesComponent } from './trip-management/edit-notes/edit-notes.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email',
  prompt: 'select_account'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


const config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '352426068501-r1o358blf1hqnhvnh5olce4b5toasadj.apps.googleusercontent.com', googleLoginOptions)
    }
    ]);

export function provideConfig() {
    return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResortComponent,
    RoomTypeComponent,
    RoomManagementComponent,
    LoginComponent,
    HomeComponent,
    TripManagementComponent,
    PointManagementComponent,
    DeleteTripComponent,
    AddTripComponent,
    EventLoggingComponent,
    EditNotesComponent
  ],
  entryComponents: [
    AddTripComponent,
    DeleteTripComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatButtonModule, MatSliderModule, MatSnackBarModule
  ],
  exports: [FormsModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: AuthServiceConfig, useFactory: provideConfig},
    Globals,
    RoomsService,
    PointsService,
    OwnersService,
    TripsService,
    EventsService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
