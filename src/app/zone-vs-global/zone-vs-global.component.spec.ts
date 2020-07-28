import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneVsGlobalComponent } from './zone-vs-global.component';

describe('ZoneVsGlobalComponent', () => {
  let component: ZoneVsGlobalComponent;
  let fixture: ComponentFixture<ZoneVsGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneVsGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneVsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
