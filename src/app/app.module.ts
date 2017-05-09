import 'hammerjs';

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

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LpBackgroundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
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
