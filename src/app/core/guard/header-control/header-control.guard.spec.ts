import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { headerControlGuard } from './header-control.guard';

describe('headerControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => headerControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
