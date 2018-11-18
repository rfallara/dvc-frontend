import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RoomsService} from './room-mgmt/rooms.service';
import {HttpClientModule} from '@angular/common/http';
import { ResortComponent } from './room-mgmt/resort/resort.component';
import { RoomTypeComponent } from './room-mgmt/room-type/room-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResortComponent,
    RoomTypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
