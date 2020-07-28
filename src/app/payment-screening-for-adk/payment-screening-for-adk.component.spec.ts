import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScreeningForAdkComponent } from './payment-screening-for-adk.component';

describe('PaymentScreeningForAdkComponent', () => {
  let component: PaymentScreeningForAdkComponent;
  let fixture: ComponentFixture<PaymentScreeningForAdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentScreeningForAdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScreeningForAdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
