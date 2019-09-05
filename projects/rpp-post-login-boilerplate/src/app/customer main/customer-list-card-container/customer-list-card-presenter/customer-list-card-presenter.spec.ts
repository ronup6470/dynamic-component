import { TestBed } from '@angular/core/testing';
import { CustomerListCardPresenter } from './customer-list-card-presenter';


describe('CustomerListCardPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerListCardPresenter = TestBed.get(CustomerListCardPresenter);
    expect(service).toBeTruthy();
  });
});
