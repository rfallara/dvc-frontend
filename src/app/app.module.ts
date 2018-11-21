import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResortComponent,
    RoomTypeComponent,
    RoomManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [FormsModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    RoomsService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
