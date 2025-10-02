import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlantDetailsComponent } from './klant-details.component';

describe('KlantDetailsComponent', () => {
  let component: KlantDetailsComponent;
  let fixture: ComponentFixture<KlantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
