import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskCountriesComponent } from './high-risk-countries.component';

describe('HighRiskCountriesComponent', () => {
  let component: HighRiskCountriesComponent;
  let fixture: ComponentFixture<HighRiskCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
