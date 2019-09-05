import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListCardPresentationComponent } from './customer-list-card-presentation.component';

describe('CustomerListCardPresentationComponent', () => {
  let component: CustomerListCardPresentationComponent;
  let fixture: ComponentFixture<CustomerListCardPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListCardPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListCardPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
