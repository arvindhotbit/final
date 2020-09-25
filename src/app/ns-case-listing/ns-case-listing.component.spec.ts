import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsCaseListingComponent } from './ns-case-listing.component';

describe('NsCaseListingComponent', () => {
  let component: NsCaseListingComponent;
  let fixture: ComponentFixture<NsCaseListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsCaseListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsCaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
