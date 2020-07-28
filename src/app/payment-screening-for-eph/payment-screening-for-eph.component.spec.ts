import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScreeningForEPHComponent } from './payment-screening-for-eph.component';

describe('PaymentScreeningForEPHComponent', () => {
  let component: PaymentScreeningForEPHComponent;
  let fixture: ComponentFixture<PaymentScreeningForEPHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentScreeningForEPHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScreeningForEPHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
