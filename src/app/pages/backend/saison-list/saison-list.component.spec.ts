import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisonListComponent } from './saison-list.component';

describe('SaisonListComponent', () => {
  let component: SaisonListComponent;
  let fixture: ComponentFixture<SaisonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
