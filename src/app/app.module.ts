import 'hammerjs';

import {Route360CommonsModule} from 'r360-commons-js/client';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FlexLayoutModule } from '@angular/flex-layout';
import { store } from '../reducers';

import { routing, AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LpBackgroundComponent } from './lp-background/lp-background.component';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LpBackgroundComponent,
    MapViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    Route360CommonsModule,
    FormsModule,
    HttpModule,
    routing,
    store,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
