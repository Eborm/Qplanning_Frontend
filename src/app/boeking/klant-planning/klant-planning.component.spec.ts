import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlantPlanningComponent } from './klant-planning.component';

describe('KlantPlanningComponent', () => {
  let component: KlantPlanningComponent;
  let fixture: ComponentFixture<KlantPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlantPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlantPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
