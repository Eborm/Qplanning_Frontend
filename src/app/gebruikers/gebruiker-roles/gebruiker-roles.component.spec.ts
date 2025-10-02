import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerRolesComponent } from './gebruiker-roles.component';

describe('GebruikerRolesComponent', () => {
  let component: GebruikerRolesComponent;
  let fixture: ComponentFixture<GebruikerRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebruikerRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
