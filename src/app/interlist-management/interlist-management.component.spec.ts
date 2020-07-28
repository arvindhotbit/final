import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterlistManagementComponent } from './interlist-management.component';

describe('InterlistManagementComponent', () => {
  let component: InterlistManagementComponent;
  let fixture: ComponentFixture<InterlistManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterlistManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterlistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
