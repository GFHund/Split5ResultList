import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendIndexComponent } from './backend-index.component';

describe('BackendIndexComponent', () => {
  let component: BackendIndexComponent;
  let fixture: ComponentFixture<BackendIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
