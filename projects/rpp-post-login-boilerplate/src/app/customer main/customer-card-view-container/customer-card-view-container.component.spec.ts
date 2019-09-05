import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardViewContainerComponent } from './customer-card-view-container.component';

describe('CustomerCardViewContainerComponent', () => {
  let component: CustomerCardViewContainerComponent;
  let fixture: ComponentFixture<CustomerCardViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCardViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCardViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
