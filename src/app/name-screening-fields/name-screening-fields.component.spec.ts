import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameScreeningFieldsComponent } from './name-screening-fields.component';

describe('NameScreeningFieldsComponent', () => {
  let component: NameScreeningFieldsComponent;
  let fixture: ComponentFixture<NameScreeningFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameScreeningFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameScreeningFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
