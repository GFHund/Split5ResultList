import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePointsRowComponent } from './table-points-row.component';

describe('TablePointsRowComponent', () => {
  let component: TablePointsRowComponent;
  let fixture: ComponentFixture<TablePointsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePointsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePointsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
