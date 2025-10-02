import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerOverzichtComponent } from './gebruiker-overzicht.component';

describe('GebruikerComponent', () => {
  let component: GebruikerOverzichtComponent;
  let fixture: ComponentFixture<GebruikerOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebruikerOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
