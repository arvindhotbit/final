import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternallistWatchlistComponent } from './internallist-watchlist.component';

describe('InternallistWatchlistComponent', () => {
  let component: InternallistWatchlistComponent;
  let fixture: ComponentFixture<InternallistWatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternallistWatchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternallistWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
