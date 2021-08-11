import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FixerApiService } from './fixer-api.service';

describe('FixerApiService', () => {
  let service: FixerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FixerApiService]
    });
    service = TestBed.inject(FixerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCurrencies should return currency object', (done:DoneFn) => {
    service.getCurrencies().subscribe(
      result => {
        expect(result instanceof Object).toBeTruthy();
        expect(result.USD).toBeDefined();
        done();
      }
    )
  })

  it('#convert should return number', (done:DoneFn) => {
    service.convert(1, 'USD', 'GBP').subscribe(
      result => {
        expect(result).toBeGreaterThanOrEqual(0.1);
        expect(result).toBeLessThanOrEqual(2.0);
        done();
      }
    )
  })
});
