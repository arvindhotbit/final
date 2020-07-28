import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternallistDefinationComponent } from './internallist-defination.component';

describe('InternallistDefinationComponent', () => {
  let component: InternallistDefinationComponent;
  let fixture: ComponentFixture<InternallistDefinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternallistDefinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternallistDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
