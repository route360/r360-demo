import { Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';

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
  }
];

export const routing = RouterModule.forRoot(routes);
