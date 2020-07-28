import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensitiveWordComponent } from './sensitive-word.component';

describe('SensitiveWordComponent', () => {
  let component: SensitiveWordComponent;
  let fixture: ComponentFixture<SensitiveWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensitiveWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensitiveWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
