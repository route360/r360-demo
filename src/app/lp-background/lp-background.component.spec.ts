import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpBackgroundComponent } from './lp-background.component';

describe('LpBackgroundComponent', () => {
  let component: LpBackgroundComponent;
  let fixture: ComponentFixture<LpBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
