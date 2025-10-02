import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjaarDetailsComponent } from './boekjaar-details.component';

describe('BoekjaarDetailsComponent', () => {
  let component: BoekjaarDetailsComponent;
  let fixture: ComponentFixture<BoekjaarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoekjaarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoekjaarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
