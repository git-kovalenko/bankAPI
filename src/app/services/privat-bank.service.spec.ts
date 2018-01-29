import { TestBed, inject } from '@angular/core/testing';

import { PrivatBankService } from './privat-bank.service';

describe('PrivatBankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivatBankService]
    });
  });

  it('should be created', inject([PrivatBankService], (service: PrivatBankService) => {
    expect(service).toBeTruthy();
  }));
});
