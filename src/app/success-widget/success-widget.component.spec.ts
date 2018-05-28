import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessWidgetComponent } from './success-widget.component';

describe('SuccessWidgetComponent', () => {
  let component: SuccessWidgetComponent;
  let fixture: ComponentFixture<SuccessWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
