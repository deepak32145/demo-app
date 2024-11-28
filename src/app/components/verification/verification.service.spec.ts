import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerificationService } from './verification.service';

describe('VerificationService', () => {
  let service: VerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificationService]
    });
    service = TestBed.inject(VerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true after delay when initiating verification', fakeAsync(() => {
    let result: boolean | undefined;
    
    service.initiateVerification().subscribe(value => {
      result = value;
    });
    
    tick(1000);
    expect(result).toBe(true);
  }));

  it('should complete the observable after emitting', fakeAsync(() => {
    let completed = false;
    
    service.initiateVerification().subscribe({
      complete: () => {
        completed = true;
      }
    });
    
    tick(1000);
    expect(completed).toBe(true);
  }));
});