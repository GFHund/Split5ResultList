import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEventDetailComponent } from './race-event-detail.component';

describe('RaceEventDetailComponent', () => {
  let component: RaceEventDetailComponent;
  let fixture: ComponentFixture<RaceEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
