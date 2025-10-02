import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedewerkerDetailsComponent } from './medewerker-details.component';

describe('MedewerkerDetailsComponent', () => {
  let component: MedewerkerDetailsComponent;
  let fixture: ComponentFixture<MedewerkerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedewerkerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedewerkerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
