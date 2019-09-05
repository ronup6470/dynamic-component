import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardFormContainerComponent } from './customer-card-form-container.component';

describe('CustomerCardFormContainerComponent', () => {
  let component: CustomerCardFormContainerComponent;
  let fixture: ComponentFixture<CustomerCardFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCardFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCardFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
