import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionedCitiesComponent } from './sanctioned-cities.component';

describe('SanctionedCitiesComponent', () => {
  let component: SanctionedCitiesComponent;
  let fixture: ComponentFixture<SanctionedCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanctionedCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionedCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
