import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysysComponent } from './paysys.component';

describe('PaysysComponent', () => {
  let component: PaysysComponent;
  let fixture: ComponentFixture<PaysysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
