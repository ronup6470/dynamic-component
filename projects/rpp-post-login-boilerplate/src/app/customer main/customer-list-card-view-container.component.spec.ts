import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListCardViewContainerComponent } from './customer-list-card-view-container.component';

describe('CustomerCardViewContainerComponent', () => {
  let component: CustomerListCardViewContainerComponent;
  let fixture: ComponentFixture<CustomerListCardViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListCardViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListCardViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
