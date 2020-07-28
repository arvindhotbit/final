import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExPaymentScreeningComponent } from './ex-payment-screening.component';

describe('ExPaymentScreeningComponent', () => {
  let component: ExPaymentScreeningComponent;
  let fixture: ComponentFixture<ExPaymentScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExPaymentScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExPaymentScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
