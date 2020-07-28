import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutralWordsComponent } from './neutral-words.component';

describe('NeutralWordsComponent', () => {
  let component: NeutralWordsComponent;
  let fixture: ComponentFixture<NeutralWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeutralWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeutralWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
