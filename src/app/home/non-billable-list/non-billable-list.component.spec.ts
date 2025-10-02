import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonBillableListComponent } from './non-billable-list.component';

describe('NonBillableListComponent', () => {
  let component: NonBillableListComponent;
  let fixture: ComponentFixture<NonBillableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonBillableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBillableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
