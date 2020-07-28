import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistBicComponent } from './blacklist-bic.component';

describe('BlacklistBicComponent', () => {
  let component: BlacklistBicComponent;
  let fixture: ComponentFixture<BlacklistBicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistBicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistBicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
