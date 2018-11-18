import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoomMgmtComponent } from './room-mgmt/room-mgmt.component';
import { HeaderComponent } from './header/header.component';
import {RoomsService} from './room-mgmt/rooms.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RoomMgmtComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
