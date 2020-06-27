import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEventListComponent } from './race-event-list.component';

describe('RaceEventListComponent', () => {
  let component: RaceEventListComponent;
  let fixture: ComponentFixture<RaceEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
