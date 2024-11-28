import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with false verification status', () => {
    expect(service.isVerified()).toBeFalse();
  });

  it('should update verification status', (done) => {
    service.isVerified$.subscribe(status => {
      if (status) {
        expect(status).toBeTrue();
        done();
      }
    });

    service.setVerificationStatus(true);
    expect(service.isVerified()).toBeTrue();
  });
});