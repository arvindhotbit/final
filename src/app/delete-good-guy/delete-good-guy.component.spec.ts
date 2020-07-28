import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGoodGuyComponent } from './delete-good-guy.component';

describe('DeleteGoodGuyComponent', () => {
  let component: DeleteGoodGuyComponent;
  let fixture: ComponentFixture<DeleteGoodGuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGoodGuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGoodGuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
