import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerDetailsComponent } from './gebruiker-details.component';

describe('GebruikerAddComponent', () => {
  let component: GebruikerDetailsComponent;
  let fixture: ComponentFixture<GebruikerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebruikerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
