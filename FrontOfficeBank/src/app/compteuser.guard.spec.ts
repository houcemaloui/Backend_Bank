import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { compteuserGuard } from './compteuser.guard';

describe('compteuserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => compteuserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
