import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerResetpasswordComponent } from './gebruiker-resetpassword.component';

describe('GebruikerResetpasswordComponent', () => {
  let component: GebruikerResetpasswordComponent;
  let fixture: ComponentFixture<GebruikerResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebruikerResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
