import { Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {MapViewComponent} from './map-view/map-view.component';

@Component({
  selector: 'app-root',
  template:  `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'map',
    component: MapViewComponent
  }
];

export const routing = RouterModule.forRoot(routes);
