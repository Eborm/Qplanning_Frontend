import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedewerkerPlanningComponent } from './medewerker-planning.component';

describe('MedewerkerPlanningComponent', () => {
  let component: MedewerkerPlanningComponent;
  let fixture: ComponentFixture<MedewerkerPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedewerkerPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedewerkerPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
