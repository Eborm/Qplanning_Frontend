import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekingenOverzichtComponent } from './boekingen-overzicht.component';

describe('BoekingenOverzichtComponent', () => {
  let component: BoekingenOverzichtComponent;
  let fixture: ComponentFixture<BoekingenOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoekingenOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoekingenOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
