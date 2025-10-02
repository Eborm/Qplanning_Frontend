import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlantOverzichtComponent } from './klant-overzicht.component';

describe('KlantOverzichtComponent', () => {
  let component: KlantOverzichtComponent;
  let fixture: ComponentFixture<KlantOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlantOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlantOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
