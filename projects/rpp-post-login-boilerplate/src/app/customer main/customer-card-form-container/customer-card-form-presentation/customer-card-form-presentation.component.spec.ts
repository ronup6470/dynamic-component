import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardFormPresentationComponent } from './customer-card-form-presentation.component';

describe('CustomerCardFormPresentationComponent', () => {
  let component: CustomerCardFormPresentationComponent;
  let fixture: ComponentFixture<CustomerCardFormPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCardFormPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCardFormPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
