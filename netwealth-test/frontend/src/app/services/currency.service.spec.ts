import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyService } from './currency.service';
import { Currency } from '../models/Currency';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#currencies$ returns an array of Currency', (done: DoneFn) => {
    service.currencies$.subscribe(
      result => {
        expect(result instanceof Array).toBeTruthy();
        expect(result[0] instanceof Object).toBeTruthy();
        done();
      }
    );
  });

  it('#getCurrency should return a currency', (done:DoneFn) => {
    service.currencies$.subscribe(() => {
      const result = service.getCurrency('USD', 'from');
      expect(result instanceof Object).toBeTruthy();
      done();
    })
  })
});
