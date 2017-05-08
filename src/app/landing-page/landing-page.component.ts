import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import * as actions from '../../actions/region.actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  regionList: Observable<any>;
  currentRegion: Observable<any>;

  constructor(public store: Store<any>) {
    this.regionList = store.select('regionList');
    this.currentRegion = store.select('currentRegion');
  }

  nextRegion() {
    this.store.dispatch(actions.nextRegion());
  }

  previousRegion() {
    this.store.dispatch(actions.prevoiusRegion());
  }

  changeCurrentRegion(id: string) {
    this.store.dispatch(actions.getById(id));
  }

  ngOnInit() {
  }

}
