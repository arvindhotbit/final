import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListingComponent } from './case-listing.component';

describe('CaseListingComponent', () => {
  let component: CaseListingComponent;
  let fixture: ComponentFixture<CaseListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
