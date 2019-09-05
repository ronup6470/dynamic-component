import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListCardContainerComponent } from './customer-list-card-container.component';

describe('CustomerListCardContainerComponent', () => {
  let component: CustomerListCardContainerComponent;
  let fixture: ComponentFixture<CustomerListCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListCardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
