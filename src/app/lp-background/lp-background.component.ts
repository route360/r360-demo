import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-lp-background',
  templateUrl: './lp-background.component.html',
  styleUrls: ['./lp-background.component.scss']
})
export class LpBackgroundComponent implements OnInit, OnChanges {

  @Input()
  imageUrl: string;

  @Input()
  preloadUrl: string;

  slideIn: boolean;
  cachedUrl: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes) {
    this.cachedUrl = changes.imageUrl.previousValue ? changes.imageUrl.previousValue : changes.imageUrl.currentValue;
    if (changes.imageUrl.firstChange) { return; };
    this.slideIn = true;
    const timer = Observable.timer(2000);
    timer.subscribe(() => this.slideIn = false );
  }

}
