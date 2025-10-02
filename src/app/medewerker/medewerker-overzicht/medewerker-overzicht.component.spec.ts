import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedewerkerOverzichtComponent } from './medewerker-overzicht.component';

describe('MedewerkerOverzichtComponent', () => {
  let component: MedewerkerOverzichtComponent;
  let fixture: ComponentFixture<MedewerkerOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedewerkerOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedewerkerOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
