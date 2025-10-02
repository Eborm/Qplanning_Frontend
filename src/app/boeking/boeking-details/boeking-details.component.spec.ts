import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekingDetailsComponent } from './boeking-details.component';

describe('BoekingAddComponent', () => {
  let component: BoekingDetailsComponent;
  let fixture: ComponentFixture<BoekingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoekingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoekingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
