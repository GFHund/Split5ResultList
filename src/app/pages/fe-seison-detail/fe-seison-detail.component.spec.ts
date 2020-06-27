import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeSeisonDetailComponent } from './fe-seison-detail.component';

describe('FeSeisonDetailComponent', () => {
  let component: FeSeisonDetailComponent;
  let fixture: ComponentFixture<FeSeisonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeSeisonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeSeisonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
