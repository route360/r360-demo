import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs/Rx';
import * as actions from '../../actions/region.actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  regionList: Observable<any>;
  currentRegion: Observable<any>;
  nextRegion: Observable<any>;

  private timer: Subscription;

  constructor(public store: Store<any>) {
    this.regionList = store.select('regionList');
    this.currentRegion = store.select('currentRegion');
    this.nextRegion = store.select('nextRegion');
    this.timer = Observable.timer(5000, 5000).subscribe(() => this.selectNextRegion());;
  }

  selectNextRegion() {
    this.store.dispatch(actions.nextRegion());
  }

  selectPreviousRegion() {
    this.store.dispatch(actions.prevoiusRegion());
  }

  changeCurrentRegion(id: string) {
    this.store.dispatch(actions.getById(id));
  }

  stopTimer() {
    this.timer.unsubscribe();
  }

  ngOnInit() {
  }

}
