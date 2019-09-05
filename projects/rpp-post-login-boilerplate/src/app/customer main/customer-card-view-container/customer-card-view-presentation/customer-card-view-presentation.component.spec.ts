import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardViewPresentationComponent } from './customer-card-view-presentation.component';

describe('CustomerCardViewPresentationComponent', () => {
  let component: CustomerCardViewPresentationComponent;
  let fixture: ComponentFixture<CustomerCardViewPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCardViewPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCardViewPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
