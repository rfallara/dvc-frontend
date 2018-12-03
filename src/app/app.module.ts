import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RoomsService} from './room-management/rooms.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ResortComponent } from './room-management/resort/resort.component';
import { RoomTypeComponent } from './room-management/room-type/room-type.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import {AuthService} from './authService.service';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth-interceptor.service';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TripManagementComponent } from './trip-management/trip-management.component';
import { PointManagementComponent } from './point-management/point-management.component';
import {Globals} from './gobals';
import {TripsService} from './trip-management/trips.service';
import { AddTripComponent } from './trip-management/add-trip/add-trip.component';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {NgxSpinnerModule} from 'ngx-spinner';

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
    AddTripComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      animationType: ngxLoadingAnimationTypes.circleSwish
    }),
    NgxSpinnerModule
  ],
  exports: [FormsModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    Globals,
    RoomsService,
    TripsService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
